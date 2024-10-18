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

const updateSpecsRepo = async (spec_details_id, ids) => {
  const specsTarget = await prisma.specs.findMany({
    where: { cars_id: ids },
  });

  const updatedSpecs = await Promise.all(
    spec_details_id.map(async (id, index) => {
      return await prisma.specs.update({
        where: { id: specsTarget[index].id },
        data: {
          spec_details_id: id,
          cars_id: ids,
        },
      });
    })
  );

  const serializedSpecs = JSONBigInt.stringify(updatedSpecs);
  return JSONBigInt.parse(serializedSpecs);
};


const deleteSpecsRepo = async (id) => {
  const deletedSpec = await prisma.specs.deleteMany({
    where: { cars_id: id },
  });
  const serializedSpecs = JSONBigInt.stringify(deletedSpec);
  return JSONBigInt.parse(serializedSpecs);
};

module.exports = {
  createSpecsRepo,
  updateSpecsRepo,
  deleteSpecsRepo,
};
