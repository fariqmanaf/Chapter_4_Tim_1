const {
  getAvailabilityRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
} = require("../repositories/availability.repository.js");
const { BadRequestError, NotFoundError } = require("../utils/request.js");
const { imageUpload } = require("../utils/imageHandler.js");

const getAvailabilityService = async (rentPerDay, available, availableAt) => {
  return getAvailabilityRepo.getAvailabilityService(
    rentPerDay,
    available,
    availableAt
  );
};

const getCarByIdService = async (id) => {
  const data = await getCarByIdRepo(id);

  if (!data) {
    throw new NotFoundError("Car not found");
  }

  return data;
};

const createCarService = async (car, files) => {
  if (files == null) {
    files = { image: null };
  }

  if (files.image) {
    car.image = await imageUpload(files.image);
  }

  const data = await createCarRepo(car);
  return data;
};

const updateCarService = async (id, car, files) => {
  const existingCar = await getCarByIdRepo(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found");
  }

  if (files == null) {
    files = { image: null };
  }

  if (files.image == null) {
    car.image = existingCar.image;
  } else {
    car.image = await imageUpload(files.image);
  }

  const updatedCars = await updateCarRepo(id, car);
  if (!updatedCars) {
    throw new BadRequestError("Failed to update car");
  }

  return updatedCars;
};

const deleteCarService = async (id) => {
  const existingCar = await getCarByIdRepo(id);
  if (!existingCar) {
    throw new NotFoundError("Car not found");
  }

  const deletedCar = await deleteCarRepo(id);
  if (!deletedCar) {
    throw new BadRequestError("Failed to delete car");
  }

  return deletedCar;
};

module.exports = {
  getAvailabilityService,
  getCarByIdService,
  createCarService,
  updateCarService,
  deleteCarService,
};
