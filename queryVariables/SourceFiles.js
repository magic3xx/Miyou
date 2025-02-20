const axios = require("axios");
const cheerio = require("cheerio");
const CryptoJS = require("crypto-js");

const BASE_URL = "https://gogoanime.fi/";
const goload_stream_url = "https://goload.pro/streaming.php";
const ENCRYPTION_KEYS_URL =
  "https://raw.githubusercontent.com/justfoolingaround/animdl-provider-benchmarks/master/api/gogoanime.json";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36";

// If gogoanime changes this is the future, well i'm fkd

async function scrapeSourceFiles(id) {
  let sources = [];
  let sources_bk = [];
  try {
    let epPage, server, $, serverUrl;

    if (id.includes("episode")) {
      epPage = await axios.get(BASE_URL + "/" + id);
      $ = cheerio.load(epPage.data);

      server = $("#load_anime > div > div > iframe").attr("src");
      serverUrl = new URL("https:" + server);
    } else serverUrl = new URL(`${goload_stream_url}?id=${id}`);

    const goGoServerPage = await axios.get(serverUrl.href, {
      headers: { "User-Agent": USER_AGENT },
    });
    const $$ = cheerio.load(goGoServerPage.data);

    const params = await generateEncryptAjaxParameters(
      $$,
      serverUrl.searchParams.get("id")
    );

    const fetchRes = await axios.get(
      `
        ${serverUrl.protocol}//${serverUrl.hostname}/encrypt-ajax.php?${params}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const res = decryptEncryptAjaxResponse(fetchRes.data);

    if (!res.source) return { error: "No source found" };

    res.source.forEach((source) => sources.push(source));
    res.source_bk.forEach((source) => sources_bk.push(source));

    return {
      Referer: serverUrl.href,
      sources: sources,
      sources_bk: sources_bk,
    };
  } catch (err) {
    return { error: err };
  }
}

// Encrypting and Decrypting stuff that I don't know anything about

let iv = null;
let key = null;
let second_key = null;

const fetch_keys = async () => {
  const response = await axios.get(ENCRYPTION_KEYS_URL);
  const res = response.data;
  return {
    iv: CryptoJS.enc.Utf8.parse(res.iv),
    key: CryptoJS.enc.Utf8.parse(res.key),
    second_key: CryptoJS.enc.Utf8.parse(res.second_key),
  };
};

async function generateEncryptAjaxParameters($, id) {
  const keys = await fetch_keys();
  iv = keys.iv;
  key = keys.key;
  second_key = keys.second_key;

  // encrypt the key
  const encrypted_key = CryptoJS.AES["encrypt"](id, key, {
    iv: iv,
  });

  const script = $("script[data-name='episode']").data().value;
  const token = CryptoJS.AES["decrypt"](script, key, {
    iv: iv,
  }).toString(CryptoJS.enc.Utf8);

  return "id=" + encrypted_key + "&alias=" + id + "&" + token;
}

function decryptEncryptAjaxResponse(obj) {
  const decrypted = CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(obj.data, second_key, {
      iv: iv,
    })
  );
  return JSON.parse(decrypted);
}

exports.scrapeSourceFiles = scrapeSourceFiles;
