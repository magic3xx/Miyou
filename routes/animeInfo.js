const express = require("express");
const axios = require("axios");
let searchQueryStrings = require("../queryVariables/searchQueryStrings");

const route = express.Router();

const baseUrl = "https://graphql.anilist.co";

route.get("/popular", async (req, res) => {
  try {
    const response = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchQueryStrings.PopularAnimeQuery,
        variables: {
          page: req.query.page === undefined ? 1 : req.query.page,
          perPage: req.query.count === undefined ? 10 : req.query.count,
        },
      },
    }).catch((err) => {
      res.status(404).json(err);
    });
    if (response === undefined || response === null) {
      res.status(404).json({
        data: "No response",
      });
    }
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Error from Popular Anime Route", err);
  }
});

route.get("/trending", async (req, res) => {
  try {
    const response = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchQueryStrings.TrendingAnimeQuery,
        variables: {
          page: req.query.page === undefined ? 1 : req.query.page,
          perPage: req.query.count === undefined ? 10 : req.query.count,
        },
      },
    }).catch((err) => {
      res.status(404).json(err);
    });
    if (response === undefined || response === null) {
      res.status(404).json({
        data: "No response",
      });
    }
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Error from Trending Anime Route", err);
  }
});

route.get("/top100", async (req, res) => {
  try {
    const response = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchQueryStrings.top100AnimeQuery,
        variables: {
          page: req.query.page === undefined ? 1 : req.query.page,
          perPage: req.query.count === undefined ? 10 : req.query.count,
        },
      },
    }).catch((err) => {
      res.status(404).json(err);
    });
    if (response === undefined || response === null) {
      res.status(404).json({
        data: "No response",
      });
    }
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Error from Top 100 Anime Route", err);
  }
});

route.get("/favourite", async (req, res) => {
  try {
    const response = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchQueryStrings.favouritesAnimeQuery,
        variables: {
          page: req.query.page === undefined ? 1 : req.query.page,
          perPage: req.query.count === undefined ? 10 : req.query.count,
        },
      },
    }).catch((err) => {
      res.json(404).json(err);
    });
    if (response === undefined || response === null) {
      res.status(404).json({
        data: "No response",
      });
    }
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Error from favourite Anime Route", err);
  }
});

route.get("/searchanime", async (req, res) => {
  try {
    const response = await axios({
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchQueryStrings.searchAnimeQuery,
        variables: {
          search: req.query.name,
        },
      },
    }).catch((err) => {
      res.status(404).json(err);
    });
    if (response === undefined || response === null) {
      res.status(404).json({
        data: "No response",
      });
    }
    res.status(200).json(response.data);
  } catch (err) {
    console.log("Error from Search Anime Route", err);
  }
});

module.exports = route;
