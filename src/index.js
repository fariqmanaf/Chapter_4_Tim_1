require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/", router);

app.use("*", notFoundURLHandler);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The express.js app is runing on port ${port}`);
});
