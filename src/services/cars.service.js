
// TODO: import the required repositories

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

  const createModelsTable = await createModelsRepo(model, type);

  const createCarTable = await createCarRepo(
    manufacture_id,
    createModelsTable.id,
    createAvailabilityTable.id
  );

  const createCarDetailsTable = await createCarDetailsRepo(
    capacity,
    transmission,
    plate,
    year,
    description,
    image,
    createCarTable.id
  );

  const createOptionsTable = await createOptionsRepo(
    option_details_id,
    createCarTable.id
  );

  const createSpecsTable = await createSpecsRepo(
    spec_details_id,
    createCarTable.id
  );

  return createCarTable;
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
    rentPerDay,
    availableAt,
    available
  );

  const updateModelsTable = await updateModelsRepo(model, type);

  const updateCarTable = await updateCarRepo(
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
    updateCarTable.id
  );

  const updateOptionsTable = await updateOptionsRepo(
    option_details_id,
    updateCarTable.id
  );

  const updateSpecsTable = await updateSpecsRepo(
    spec_details_id,
    updateCarTable.id
  );

  return updateCarTable;
};

const deleteCarService = async (id) => {
  const existingCar = await getCarByIdRepo(id);

  const deleteCarTable = await deleteCarRepo(existingCar.id);
  const deleteAvailabilityTable = await deleteAvailabilityRepo(
    existingCar.availability_id
  );
  const deleteModelsTable = await deleteModelsRepo(existingCar.model_id);
  const deleteCarDetailsTable = await deleteCarDetailsRepo(id);
  const deleteOptionsTable = await deleteOptionsRepo(id);
  const deleteSpecsTable = await deleteSpecsRepo(id);

  return deleteCarTable;
};

module.exports = {
  getCarsService,
  getCarByIdService,
  createCarService,
  updateCarService,
  deleteCarService,
};
