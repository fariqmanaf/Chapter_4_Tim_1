const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getModels = async (model, type) => {
  const filters = {};

  // Tambahkan filter untuk model jika disediakan
  if (model) {
    filters.model = {
      contains: model,
      mode: "insensitive",
    };
  }

  // Tambahkan filter untuk type jika disediakan
  if (type) {
    filters.type = {
      contains: type,
      mode: "insensitive",
    };
  }

  // Lakukan query ke database dengan filter yang ada
  const searchedModel = await prisma.models.findMany({
    where: filters,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(searchedModel);
  return JSONBigInt.parse(serializedModels);
};

exports.getModelById = async (id) => {
  // find student by id
  const models = await prisma.models.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(models);
  return JSONBigInt.parse(serializedModels);
};

exports.createModel = async (data) => {
  const newModel = await prisma.models.create({
    data: {
      model: data.model,
      type: data.type,
    },
  });

  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};

exports.updateModel = async (id, data) => {
  const updatedModels = await prisma.models.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(updatedModels);
  return JSONBigInt.parse(serializedModels);
};

exports.deleteModelById = async (id) => {
  const deletedModels = await prisma.models.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedModels = JSONBigInt.stringify(deletedModels);
  return JSONBigInt.parse(serializedModels);
};
