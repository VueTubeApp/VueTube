//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';

//---   Logger Function   ---//
function logger(func, data) {
  module.logs.unshift({
    name: func,
    time: Date.now(),
    data: data
  })
}

const module = {
  logs: new Array(),

  //---   Get YouTube's Search Auto Complete   ---//
  async autoComplete(text, callback) {
    const res = await Http.request({
      method: 'GET',
      url: 'https://suggestqueries-clients6.youtube.com/complete/search',
      params: { client: 'youtube', q: text }
    })
    .catch((err) => {
      logger("autoComplete", err);
      callback(err);
    });
    logger("autoComplete", res);
    callback(res.data);
  },

  search(text, callback) {
    Http.request({
      method: 'GET',
      url: 'https://youtube.com/results',
      params: { q: text, hl: "en" }
    })
    .then((res) => {
      //---   Get HTML Only   ---//
      let html = res.data;
      //---   Isolate The Script Containing Video Information   ---//
      html = html.split("var ytInitialData =")[1].split("</script>")[0].slice(0, -1);
      //---   Replace Encoded Characters   ---///
      html = html.replace(/\\x([0-9A-F]{2})/ig, (...items) => { return String.fromCharCode(parseInt(items[1], 16)); });
      //---   Properly Format JSON   ---//
      html = html.replaceAll("\\\\\"", "");
      //---   Parse JSON & Get Results   ---//
      let results = JSON.parse(html);
      results = results.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
      //---   Output   ---//
      logger("search", results);
      callback(results);
    })
    .catch((err) => {
      logger("search", err);
      callback(err);
    });
  }

}

//---   Start   ---//
export default ({ app }, inject) => {
  inject('youtube', module)
}
logger("Initialize","Program Started");
