const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const getAvailabilityRepo = async (rentPerDay, available, availableAt) => {
  let query = {
    include: {
      availability: true, 
    },
  };

  let andQuery = [];
  if (rentPerDay) {
    andQuery.push({
      availability: { rent_perday: rentPerDay },
    });
  }
  if (available !== undefined) {
    andQuery.push({
      availability: { available: available },
    });
  }
  if (availableAt) {
    andQuery.push({
      availability: {
        available_at: { contains: availableAt, mode: "insensitive" },
      },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      ...query.where,
      AND: andQuery,
    };
  }

  const searchedCars = await prisma.cars.findMany(query);

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};


const getCarByIdRepo = (id) => {
  const car = cars.find((car) => car.id == id);
  return car;
};

const createCarRepo = (car) => {
  const newCar = {
    id: uuidv4(),
    ...car,
  };

  cars.push(newCar);

  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4));

  return newCar;
};

const updateCarRepo = (id, car) => {
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

const deleteCarRepo = (id) => {
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
