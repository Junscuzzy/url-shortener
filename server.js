"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connect = require("./src/db");
const urlRouter = require("./src/url/route");

const port = process.env.PORT || 3000;

// connect to the database
connect();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(process.cwd() + "/public"));

// Application routes
app.use("/api/shorturl", urlRouter);

// Index route
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
