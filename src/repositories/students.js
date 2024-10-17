
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  // Define query here
  let query = {
    include: {
      classes: true,
      universities: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push({
      name: { contains: name, mode: "insensitive" },
    });
  }
  if (nickName) {
    orQuery.push({
      nickName: { contains: nickName, mode: "insensitive" },
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedStudents = await prisma.students.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
  // find student by id
  const student = await prisma.students.findUnique({
    where: {
      id: id,
    },
    include: {
      classes: true,
      universities: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
  const newStudent = await prisma.students.create({
    data,
    include: {
      classes: true,
      universities: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.updateStudent = async (id, data) => {
  const updatedStudent = await prisma.students.update({
    where: {
      id: id,
    },
    include: {
      classes: true,
      universities: true,
    },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(updatedStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.deleteStudentById = async (id) => {
  const deletedUser = await prisma.students.delete({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(deletedUser);
  return JSONBigInt.parse(serializedStudents);
};
