const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createSpecsRepo = async (spec_details_id, car_id) => {
  const newSpec = await prisma.specs.create({
    data: {
      spec_details_id,
      car_id,
    },
  });
  return newSpec;
};

const updateSpecsRepo = async (id, data) => {
  const updatedSpec = await prisma.specs.update({
    where: { id },
    data,
  });
  return updatedSpec;
};

const deleteSpecsRepo = async (id) => {
  const deletedSpec = await prisma.specs.delete({
    where: { id },
  });
  return deletedSpec;
};

module.exports = {
  createSpecsRepo,
  updateSpecsRepo,
  deleteSpecsRepo,
};
