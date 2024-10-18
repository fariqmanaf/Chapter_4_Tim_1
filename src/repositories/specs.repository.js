const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const createSpecsRepo = async (spec_details_id, car_id) => {
  const newSpec = await prisma.specs.create({
    data: {
      spec_details_id,
      car_id,
    },
  });
  const serializedSpecs = JSONBigInt.stringify(newSpec);
  return JSONBigInt.parse(serializedSpecs);
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
  const serializedSpecs = JSONBigInt.stringify(deletedSpecs);
  return JSONBigInt.parse(serializedSpecs);
};

module.exports = {
  createSpecsRepo,
  updateSpecsRepo,
  deleteSpecsRepo,
};
