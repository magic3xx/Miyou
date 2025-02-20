const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const route = express.Router();

const link = "https://gogoanime.fi//search.html?keyword=";

route.get("/search", async (req, res) => {
  let linkName = req.query.name;
  linkName = encodeURIComponent(linkName.trim());

  try {
    const result = [];
    const { data } = await axios.get(link + linkName);
    const $ = cheerio.load(data);
    $(".last_episodes ul li").each((i, el) => {
      const $el = $(el);
      const image = $el.find(".img a img[src]").attr("src");
      const title = $el.find("p a").attr("title");
      const releasedDate = $el.find(".released").text().replace(/\s\s+/g, "");
      const link = $el.find(".img a").attr("href");

      result.push({
        title: title,
        image: image,
        link: link,
        releasedDate: releasedDate,
      });
    });
    res.status(200).json(result);
  } catch (err) {
    console.log("Error from Search Route", err);
  }
});

module.exports = route;
