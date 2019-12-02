const express = require("express");

const { postUrl, getUrl, getAll, checkIfNewExists } = require("./controller");

const router = express.Router();

router
  .use("/new", checkIfNewExists) // Middleware check if url exists in db
  .post("/new", postUrl) // Add new if dont exists
  .get("/:short_url", getUrl) // Display single
  .get("/", getAll); // display all

module.exports = router;
