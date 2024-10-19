const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();

const createOptionsRepo = async (option_details_id, cars_id) => {
  const newOptions = option_details_id.map(async (id) => {
    await prisma.options.create({
      data: {
        option_details_id: id,
        cars_id,
      },
    });
  });
  const serializedOptions = JSONBigInt.stringify(newOptions);
  return JSONBigInt.parse(serializedOptions);
};

const updateOptionsRepo = async (id, data) => {
  const updatedOptions = await prisma.options.update({
    where: { id },
    data,
  });
  const serializedOptions = JSONBigInt.stringify(updatedOptions);
  return JSONBigInt.parse(serializedOptions);
};

const deleteOptionsRepo = async (cars_id) => {
  const option = await prisma.options.findFirst({
    where: { cars_id: cars_id },
  });

  if (!option) {
    throw new Error("Option not found for the given cars_id");
  }

  const deleteOptions = await prisma.options.delete({
    where: { id: option.id },
  });
  const serializedOptions = JSONBigInt.stringify(deleteOptions);
  return JSONBigInt.parse(serializedOptions);
};

module.exports = {
  createOptionsRepo,
  updateOptionsRepo,
  deleteOptionsRepo,
};
