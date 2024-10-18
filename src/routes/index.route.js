const express = require("express");
const carsRouter = require("./cars.route");
const modelsRouter = require("./models");
const availabilityRouter = require("./availability.route");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/availability", availabilityRouter);
router.use("/models", modelsRouter);

module.exports = router;
