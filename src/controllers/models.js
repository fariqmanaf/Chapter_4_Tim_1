const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

exports.createModel = async (req, res) => {
  const data = await modelService.createModel(req);
  successResponse(res, data);
};
