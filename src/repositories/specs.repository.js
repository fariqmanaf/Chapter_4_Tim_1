const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const createSpecsRepo = async (spec_details_id, cars_id) => {
  const newSpec = spec_details_id.map(async (id) => {
    await prisma.specs.create({
      data: {
        spec_details_id: id,
        cars_id,
      },
    });
  });
  const serializedSpecs = JSONBigInt.stringify(newSpec);
  return JSONBigInt.parse(serializedSpecs);
};

const updateSpecsRepo = async (id, spec_details_id, updateCarTable) => {
  const updatedSpec = await prisma.specs.update({
    where: { id },
    data : { 
      spec_details_id,
      updateCarTable,
    }
  });
  return updatedSpec;
};

const deleteSpecsRepo = async (cars_id) => {
  const spec = await prisma.specs.findFirst({
    where: { cars_id: cars_id },
  });

  if (!spec) {
    throw new Error("Spec not found for the given cars_id");
  }

  const deletedSpec = await prisma.specs.delete({
    where: { id: spec.id },
  });
  const serializedSpecs = JSONBigInt.stringify(deletedSpec);
  return JSONBigInt.parse(serializedSpecs);
};

module.exports = {
  createSpecsRepo,
  updateSpecsRepo,
  deleteSpecsRepo,
};
