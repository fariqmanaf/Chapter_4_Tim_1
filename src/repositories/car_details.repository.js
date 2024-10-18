const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");

const createCarDetailsRepo = async (
  capacity,
  transmission,
  plate,
  year,
  description,
  image,
  cars_id
) => {
  const newOptions = await prisma.car_details.create({
    data: {
      capacity,
      transmission,
      plate,
      year,
      image,
      description,
      cars_id,
    },
  });
  const serializedOptions = JSONBigInt.stringify(newOptions);
  return JSONBigInt.parse(serializedOptions);
};

const updateCarDetailsRepo = async (id, data) => {
  const updatedCarDetails = await prisma.car_details.update({
    where: { id },
    data,
  });
  const serializedCarDetails = JSONBigInt.stringify(updatedCarDetails);
  return JSONBigInt.parse(serializedCarDetails);
};

const deleteCarDetailsRepo = async (id) => {
  const deleteCarDetails = await prisma.car_details.delete({
    where: { id },
  });
  const serializedCarDetails = JSONBigInt.stringify(deleteCarDetails);
  return JSONBigInt.parse(serializedCarDetails);
};

module.exports = {
  createCarDetailsRepo,
  updateCarDetailsRepo,
  deleteCarDetailsRepo,
};
