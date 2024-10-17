const modelRepository = require("../repositories/models");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.createModel = async (data) => {
  return modelRepository.createModel(data);
};