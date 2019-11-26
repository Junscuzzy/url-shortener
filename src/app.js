"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");

var cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var app = express();

// TODO : Split into 3 files
// - APP (cors, connect) ? => Can be in the server.js directly
// - DB (connection mongo && method CRUD)
// - API (routes rest api)

console.log("mongo", process.env.MONGO_URI);

/** this project needs a db !! **/

// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

module.exports = app;
