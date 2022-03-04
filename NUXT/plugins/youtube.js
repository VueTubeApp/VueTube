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
  autoComplete(text, callback) {
    Http.request({
      method: 'GET',
      url: 'https://suggestqueries-clients6.youtube.com/complete/search',
      params: { client: 'youtube', q: text }
    })
    .then((res) => {
      logger("autoComplete", res);
      callback(res.data);
    })
    .catch((err) => {
      logger("autoComplete", err);
      callback(err);
    });
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
      html = html.split("var ytInitialData = '")[1].split("';</script>")[0];
      //---   Replace Encoded Characters   ---///
      html = html.replace(/\\x([0-9A-F]{2})/ig, (...items) => { return String.fromCharCode(parseInt(items[1], 16)); });
      //---   Properly Format JSON   ---//
      html = html.replaceAll("\\\\\"", "");
      //---   Parse JSON   ---//
      html = JSON.parse(html);
      
      //---   Get Results   ---// ( Thanks To appit-online On Github ) -> https://github.com/appit-online/youtube-search/blob/master/src/lib/search.ts
      let results;
      if (html && html.contents && html.contents.sectionListRenderer && html.contents.sectionListRenderer.contents
        && html.contents.sectionListRenderer.contents.length > 0 
        && html.contents.sectionListRenderer.contents[0].itemSectionRenderer
        && html.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.length > 0) {
          results = html.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
          logger("search", results);
          callback(results);
      } else {
        try {
          results = JSON.parse(html.split('{"itemSectionRenderer":{"contents":')[html.split('{"itemSectionRenderer":{"contents":').length - 1].split(',"continuations":[{')[0]);
          logger("search", results);
          callback(results);
        } catch (e) {}
        try {
          results = JSON.parse(html.split('{"itemSectionRenderer":')[html.split('{"itemSectionRenderer":').length - 1].split('},{"continuationItemRenderer":{')[0]).contents;
          logger("search", results);
          callback(results);
        } catch(e) {}
      }



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
