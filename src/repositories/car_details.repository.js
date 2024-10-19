const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

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

const deleteCarDetailsRepo = async (cars_id) => {
  const carDetails = await prisma.car_details.findMany({
    where: { cars_id: cars_id },
  });
  if (!carDetails || carDetails.length === 0) {
    return null; 
  }
  const deletedCarDetails = await Promise.all(
    carDetails.map(async (detail) => {
      return await prisma.car_details.delete({
        where: { id: detail.id },
      });
    })
  );

  const serializedCarDetails = JSONBigInt.stringify(deletedCarDetails);
  return JSONBigInt.parse(serializedCarDetails);
};

module.exports = {
  createCarDetailsRepo,
  updateCarDetailsRepo,
  deleteCarDetailsRepo,
};
