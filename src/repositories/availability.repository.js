const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

const createAvailabilityRepo = async (rentPerDay, availableAt, available) => {
  const newAvailability = await prisma.availability.create({
    data: {
      rent_perday: rentPerDay,
      available_at: availableAt,
      available: available,
    },
  });
  const serializedAvailabilitys = JSONBigInt.stringify(newAvailability);
  return JSONBigInt.parse(serializedAvailabilitys);
};

const updateAvailabilityRepo = async (id, data) => {
  const updatedAvailability = await prisma.availability.update({
    where: { id },
    data,
  });
  const serializedAvailabilitys = JSONBigInt.stringify(updatedAvailabilitys);
  return JSONBigInt.parse(serializedAvailabilitys);
};

const deleteAvailabilityRepo = async (id) => {
  const deletedAvailability = await prisma.availability.delete({
    where: { id },
  });
  const serializedAvailabilitys = JSONBigInt.stringify(deletedAvailabilitys);
  return JSONBigInt.parse(serializedAvailabilitys);
};

module.exports = {
  createAvailabilityRepo,
  updateAvailabilityRepo,
  deleteAvailabilityRepo,
};
