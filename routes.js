const express = require("express");
const route = express.Router();

// Import routes
const searchRoute = require("./routes/search");
const animeInfo = require("./routes/animeInfo");
const getAnime = require("./routes/getAnime");
const getLinks = require("./routes/getLinks");

route.use("/", searchRoute); // /api/search?name=demon slayer
route.use("/", animeInfo); // /api/popular?count=10
route.use("/", getAnime);
route.use("/", getLinks);

module.exports = route;
