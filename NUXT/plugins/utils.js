// Collection of functions that are useful but non-specific to any particular files

function getBetweenStrings(data, start_string, end_string) {
  const regex = new RegExp(
    `${escapeRegExp(start_string)}(.*?)${escapeRegExp(end_string)}`,
    "s"
  );
  const match = data.match(regex);
  return match ? match[1] : undefined;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getCpn() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 16; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function getMutationByKey(key, mutations) {
  if (!key || !mutations) return undefined;
  return mutations.find((mutation) => mutation.entityKey === key).payload;
}

function setHttp(link) {
  if (link.search(/^http[s]?\:\/\//) == -1) {
    link = "http://" + link;
  }
  return link;
}

// Replace inputted html with tweemoji
function parseEmoji(body) {
  if (twemoji)
    return twemoji.parse(body, {
      folder: "svg",
      ext: ".svg",
    });
}

function linkParser(url) {
  let result;
  if (url) {
    try {
      const slug = new URL(setHttp(url));
      const host = slug.hostname.toLowerCase().replace(/^(www|m)\./, "");
      if (host == "youtube.com") {
        result = slug;
      } else if (host == "youtu.be") {
        result = new URL("/watch", window.location.origin);
        result.searchParams.set("v", slug.pathname.split("/")[1]);
      }
    } finally {
      return result instanceof URL ? result : false;
    }
  }
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function humanFileSize(size) {
  var i = Math.floor( Math.log(size) / Math.log(1024) );
  return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

module.exports = {
  getBetweenStrings,
  hexToRgb,
  rgbToHex,
  getCpn,
  getMutationByKey,
  linkParser,
  delay,
  parseEmoji,
  humanFileSize,
};
