const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getManufactures = async (name) => {
  const filters = {};

  // Tambahkan filter untuk Manufacture jika disediakan
  if (name) {
    filters.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  // Lakukan query ke database dengan filter yang ada
  const searchedManufacture = await prisma.manufactures.findMany({
    where: filters,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedManufactures = JSONBigInt.stringify(searchedManufacture);
  return JSONBigInt.parse(serializedManufactures);
};

exports.getManufactureById = async (id) => {
  // find student by id
  const Manufactures = await prisma.manufactures.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedManufactures = JSONBigInt.stringify(Manufactures);
  return JSONBigInt.parse(serializedManufactures);
};

exports.createManufacture = async (data) => {
  const newManufacture = await prisma.manufactures.create({
    data: {
      name: data.name,
    },
  });

  const serializedManufactures = JSONBigInt.stringify(newManufacture);
  return JSONBigInt.parse(serializedManufactures);
};

exports.updateManufacture = async (id, data) => {
  const updatedManufactures = await prisma.manufactures.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedManufactures = JSONBigInt.stringify(updatedManufactures);
  return JSONBigInt.parse(serializedManufactures);
};

exports.deleteManufactureById = async (id) => {
  const deletedManufactures = await prisma.manufactures.delete({
    where: { id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedManufactures = JSONBigInt.stringify(deletedManufactures);
  return JSONBigInt.parse(serializedManufactures);
};
