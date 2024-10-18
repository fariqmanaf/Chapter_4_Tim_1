const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

exports.getModels = async (req, res) => {
  const data = await modelService.getModels(req.query?.model, req.query?.type);
  successResponse(res, data);
};

exports.getModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get models by id
  const data = await modelService.getModelById(id);
  successResponse(res, data);
};

exports.createModel = async (req, res) => {
  const data = await modelService.createModel(req.body);
  successResponse(res, data);
};

exports.updateModel = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await modelService.updateModel(id, req.body);
  successResponse(res, data);
};

exports.deleteModelById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await modelService.deleteModelById(id);
  successResponse(res, data);
};
