const express = require("express");
const carsRouter = require("./cars.route");
const availabilityRouter = require("./availability.route");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/availability", availabilityRouter);

module.exports = router;
