const express = require("express");
const carsRouter = require("./cars.route");
const modelsRouter = require("./models");
const availabilityRouter = require("./availability.route");
const optionsRouter = require("./options.route");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/availability", availabilityRouter);
router.use("/models", modelsRouter);
router.use("/options", optionsRouter);

module.exports = router;
