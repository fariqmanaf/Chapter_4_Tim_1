const express = require("express");
const carsRouter = require("./cars.route");
const specsRouter = require("./specs.route");
const modelsRouter = require("./models");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/specs", specsRouter);
router.use("/models", modelsRouter);

module.exports = router;
