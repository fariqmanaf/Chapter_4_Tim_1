const express = require("express");

const { validateCreateModel } = require("../middleware/models");
const { createModel } = require("../controllers/models");

const router = express.Router();

router.route("/").post(validateCreateModel, createModel);

module.exports = router;
