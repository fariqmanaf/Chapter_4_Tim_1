const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JSONBigInt = require("json-bigint");

exports.createModelsRepo = async (model, type) => {
  const newModels = await prisma.models.create({
    data: {
      model,
      type,
    },
  });

  const serializedModels = JSONBigInt.stringify(newModels);
  return JSONBigInt.parse(serializedModels);
};

exports.updateModels = async (id, data) => {
  const updatedModels = await prisma.models.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(updatedModels);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelsById = async (id) => {
  const deletedModels = await prisma.models.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(deletedModels);
  return JSONBigInt.parse(serializedModels);
};
