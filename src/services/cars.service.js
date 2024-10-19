const {
  getCarsRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
} = require("../repositories/cars.repository.js");
const {
  createAvailabilityRepo,
  updateAvailabilityRepo,
  deleteAvailabilityRepo,
} = require("../repositories/availability.repository.js");
const {
  createSpecsRepo,
  updateSpecsRepo,
  deleteSpecsRepo,
} = require("../repositories/specs.repository.js");
const {
  createCarDetailsRepo,
  updateCarDetailsRepo,
  deleteCarDetailsRepo,
} = require("../repositories/car_details.repository.js");
const {
  createOptionsRepo,
  updateOptionsRepo,
  deleteOptionsRepo,
} = require("../repositories/options.repository.js");
const {
  createModelsRepo,
  updateModelsRepo,
  deleteModelsRepo,
} = require("../repositories/models.repository.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { BadRequestError, NotFoundError } = require("../utils/request.js");
const { imageUpload } = require("../utils/imageHandler.js");
const e = require("express");

const getCarsService = async (manufacture) => {
  const data = await getCarsRepo(manufacture);
  if (data.length === 0) {
    throw new NotFoundError("Car not found");
  }
  return data;
};

const getCarByIdService = async (id) => {
  const data = await getCarByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Car not found");
  }

  return data;
};

const createCarService = async (car, files) => {
  if (files?.image) {
    car.image = await imageUpload(files.image);
  }

  const {
    rentPerDay,
    availableAt,
    available,
    model,
    type,
    manufacture_id,
    capacity,
    option_details_id,
    spec_details_id,
    transmission,
    plate,
    year,
    description,
    image,
  } = car;

  const createAvailabilityTable = await createAvailabilityRepo(
    rentPerDay,
    availableAt,
    available
  );
  console.log(`Availability created with ID: ${createAvailabilityTable.id}`);


  const createModelsTable = await createModelsRepo(model, type);
  console.log(`Model created with ID: ${createModelsTable.id}`);

  const createCarTable = await createCarRepo(
    manufacture_id,
    createModelsTable.id,
    createAvailabilityTable.id
  );
  console.log(`Car created with ID: ${createCarTable.id}`);


  const createCarDetailsTable = await createCarDetailsRepo(
    capacity,
    transmission,
    plate,
    year,
    description,
    image,
    createCarTable.id
  );
  console.log(`Car details created with ID: ${createCarDetailsTable.id}`);

  const createOptionsTable = await createOptionsRepo(
    option_details_id,
    createCarTable.id
  );
  console.log(`Options created with ID: ${createOptionsTable.id}`);

  const createSpecsTable = await createSpecsRepo(
    spec_details_id,
    createCarTable.id
  );
  console.log(`Specs created with ID: ${createSpecsTable.id}`);

  const newCar = await getCarByIdRepo(createCarTable.id);

  return newCar;
};

const updateCarService = async (id, car, files) => {
  const existingCar = await getCarByIdRepo(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found");
  }

  if (files?.image) {
    car.image = await imageUpload(files.image);
  } else {
    car.image = existingCar.image;
  }

  const {
    rentPerDay,
    availableAt,
    available,
    model,
    type,
    manufacture_id,
    capacity,
    option_details_id,
    spec_details_id,
    transmission,
    plate,
    year,
    description,
    image,
  } = car;

  const updateAvailabilityTable = await updateAvailabilityRepo(
    existingCar.availability_id,
    rentPerDay,
    availableAt,
    available
  );

  const updateModelsTable = await updateModelsRepo(
    existingCar.model_id,
    model,
    type
  );

  const updateCarTable = await updateCarRepo(
    id,
    manufacture_id,
    updateModelsTable.id,
    updateAvailabilityTable.id
  );

  const updateCarDetailsTable = await updateCarDetailsRepo(
    capacity,
    transmission,
    plate,
    year,
    description,
    image,
    id
  );

  const updateOptionsTable = await updateOptionsRepo(option_details_id, id);

  const updateSpecsTable = await updateSpecsRepo(spec_details_id, id);

  return existingCar;
};

const deleteCarService = async (cars_id) => {
  console.log(`Trying to delete car with ID: ${cars_id}`);

  const existingCar = await prisma.cars.findUnique({
    where: { id: cars_id },
    include: {
      manufactures: true,
      models: true,
      availability: true,
      car_details: true,
      options: {
        include: {
          option_details: true,
        },
      },
      specs: {
        include: {
          spec_details: true,
        },
      },
    },
  });

  if (!existingCar) {
    console.error("Car not found");
    throw new Error("Car not found");
  }

  try {
    await prisma.$transaction(
      async (prisma) => {
        console.log(`Deleting related data for car ID: ${existingCar.id}`);

        await deleteCarDetailsRepo(existingCar.id);
        await deleteOptionsRepo(existingCar.id);
        await deleteSpecsRepo(existingCar.id);

        await deleteCarRepo(existingCar.id);
        console.log(`Car with ID: ${existingCar.id} deleted`);
      },
      {
        maxWait: 5000,
        timeout: 20000, 
      }
    );

    return { message: `Car with ID: ${existingCar.id} deleted successfully` };
  } catch (error) {
    console.error(error);
    throw new Error(`Error deleting car with ID: ${existingCar.id}`);
  }
};

module.exports = {
  getCarsService,
  getCarByIdService,
  createCarService,
  updateCarService,
  deleteCarService,
};
