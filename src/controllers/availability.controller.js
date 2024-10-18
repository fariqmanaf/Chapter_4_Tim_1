const { successResponse } = require("../utils/response.js");
const {
  getAvailabilityService,
  getCarByIdService,
  createCarService,
  updateCarService,
  deleteCarService,
} = require("../services/availability.service.js");

const getAvailabilityController = async (req, res) => {
  const { rentPerDay, available, availableAt } = req.query;

  const data = await getCarsService(rentPerDay, available, availableAt);
  successResponse(res, data);
};

const getCarByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getCarByIdService(id);
  successResponse(res, data);
};

const createCarController = async (req, res) => {
  const { body, files } = req;

  const data = await createCarService(body, files);
  successResponse(res, data);
};

const updateCarController = async (req, res) => {
  const { id } = req.params;
  const { body, files } = req;

  const data = await updateCarService(id, body, files);
  successResponse(res, data);
};

const deleteCarController = async (req, res) => {
  const { id } = req.params;

  const data = await deleteCarService(id);
  successResponse(res, data);
};

module.exports = {
  getAvailabilityController,
  getCarByIdController,
  createCarController,
  updateCarController,
  deleteCarController,
};
