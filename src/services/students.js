const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = async (name, nickName) => {
  return studentRepository.getStudents(name, nickName);
};

exports.getStudentById = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }

  return student;
};

exports.createStudent = async (data, file) => {
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  const updatedStudent = await studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = async (id) => {
  const existingStudent = await studentRepository.getStudentById(id);
  if (!existingStudent) {
    throw new NotFoundError("Student is Not Found!");
  }

  const deletedStudent = await studentRepository.deleteStudentById(id);
  if (!deletedStudent) {
    throw new InternalServerError(["Failed to delete student!"]);
  }

  return deletedStudent;
};
