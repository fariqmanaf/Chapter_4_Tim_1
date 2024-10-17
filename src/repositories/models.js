const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.createModel = async (data) => {
  const newModel = await prisma.models.create({
    data: {
      ...data,
    },
    include: {
      model: true,
      type: true,
    },
  });

  const serializedModels = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedModels);
};
