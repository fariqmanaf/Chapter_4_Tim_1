const express = require("express");
const carsRouter = require("./cars.route");

const router = express.Router();

router.use("/cars", carsRouter);

module.exports = router;
