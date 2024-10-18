const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getCarsRepo = async (manufacture) => {
  const searchedCars = await prisma.cars.findMany({
    where: manufacture ? { manufactures: { name: manufacture } } : undefined,
    include: {
      manufactures: true,
      models: true,
      availability: true,
      car_details: true,
      options: {
        include: { option_details: true },
      },
      specs: {
        include: { spec_details: true },
      },
    },
  });

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

const getCarByIdRepo = async (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

const createCarRepo = async (car) => {
  
};

const updateCarRepo = async (id, car) => {
  const findIndex = cars.findIndex((car) => car.id == id);
  if (findIndex !== -1) {
    cars.splice(findIndex, 1, {
      ...cars[findIndex],
      ...car,
    });
  } else {
    throw new NotFoundError("Car not found");
  }

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4));

  return cars[findIndex];
};

const deleteCarRepo = async (id) => {
  const findIndex = cars.findIndex((car) => car.id == id);
  if (findIndex < 0) {
    return null;
  }

  const deletedCar = cars.splice(findIndex, 1);
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4));
  return deletedCar;
};

module.exports = {
  getCarsRepo,
  getCarByIdRepo,
  createCarRepo,
  updateCarRepo,
  deleteCarRepo,
};
