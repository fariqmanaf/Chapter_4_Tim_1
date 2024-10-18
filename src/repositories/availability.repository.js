const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createAvailabilityRepo = async (rentPerDay, availableAt, available) => {
  const newAvailability = await prisma.availability.create({
    data: {
      rent_perday: rentPerDay,
      available_at: availableAt,
      available: available,
    },
  });
  return newAvailability;
};

const updateAvailabilityRepo = async (id, data) => {
  const updatedAvailability = await prisma.availability.update({
    where: { id },
    data,
  });
  return updatedAvailability;
};

const deleteAvailabilityRepo = async (id) => {
  const deletedAvailability = await prisma.availability.delete({
    where: { id },
  });
  return deletedAvailability;
};

module.exports = {
  createAvailabilityRepo,
  updateAvailabilityRepo,
  deleteAvailabilityRepo,
};
