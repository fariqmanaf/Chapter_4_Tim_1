const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = async (req, res, next) => {
    const data = await studentService.getStudents(
        req.query?.name,
        req.query?.nickName
    );
    successResponse(res, data);
};

exports.getStudentById = async (req, res, next) => {
    const { id } = req.params;

    const data = await studentService.getStudentById(id);
    successResponse(res, data);
};

exports.createStudent = async (req, res, next) => {
    const data = await studentService.createStudent(req.body, req.files);
    successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
    const { id } = req.params;
    const data = await studentService.updateStudent(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteStudentById = async (req, res, next) => {
    const { id } = req.params;
    const data = await studentService.deleteStudentById(id);
    successResponse(res, data);
};
