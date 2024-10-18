const modelRepository = require("../repositories/models");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getModels = async (model, type) => {
  return modelRepository.getModels(model, type);
};

exports.getModelById = async (id) => {
  const models = await modelRepository.getModelById(id);
  if (!models) {
    throw new NotFoundError("Models is Not Found!");
  }

  return models;
};

exports.createModel = async (data) => {
  return modelRepository.createModel(data);
};

exports.updateModel = async (id, data) => {
  // find student is exist or not (validate the data)
  const existingModels = modelRepository.getModelById(id);
  if (!existingModels) {
    throw new NotFoundError("Models is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingModels, // existing Student
    ...data,
  };

  // if exist, we will update the student data
  const updatedModels = modelRepository.updateModel(id, data);
  if (!updatedModels) {
    throw new InternalServerError(["Failed to update models!"]);
  }

  return updatedModels;
};

exports.deleteModelById = async (id) => {
  // find models is exist or not (validate the data)
  const existingModels = await modelRepository.getModelById(id);
  if (!existingModels) {
    throw new NotFoundError("Models is Not Found!");
  }

  // if exist, we will delete the models data
  const deletedModels = await modelRepository.deleteModelById(id);
  if (!deletedModels) {
    throw new InternalServerError(["Failed to delete models!"]);
  }

  return deletedModels;
};
