const express = require("express");
const carsRouter = require("./cars.route");
const manufacturesRouter = require("./manufacture.route");
const availabilityRouter = require("./availability.route");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/availability", availabilityRouter);
router.use("/manufactures", manufacturesRouter);

module.exports = router;
