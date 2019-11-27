const express = require("express");

const { postUrl } = require("./controller");

const router = express.Router();

router
  // .use("/new", ) // Middleware check if url exists in db
  .post("/new", postUrl); // Add new if dont exists
// .get("/new", postUrl); // display if exists
// .get("/:short_url", postUrl) // Display single
// .get("/", postUrl); // display all
// .detele('/:_id', deleteById) // delete

module.exports = router;
