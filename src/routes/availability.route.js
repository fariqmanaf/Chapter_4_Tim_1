const express = require("express");
const {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCar,
} = require("../middleware/cars");
const {
  getCarsController,
  getCarByIdController,
  createCarController,
  updateCarController,
  deleteCarController,
} = require("../controllers/cars.controller");

const router = express.Router();

router
  .route("/")
  .get(validateGetCars, getCarsController)
  .post(validateCreateCar, createCarController);

router
  .route("/:id")
  .get(validateGetCarById, getCarByIdController)
  .put(validateUpdateCar, updateCarController)
  .delete(validateDeleteCar, deleteCarController);

module.exports = router;
