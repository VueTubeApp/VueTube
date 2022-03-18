//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';
import Innertube from './innertube'
import constants from '../static/constants';

//---   Logger Function   ---//
function logger(func, data, isError = false) {
    searchModule.logs.unshift({
        name: func,
        time: Date.now(),
        data: data,
        error: isError
    })
}

//---   Youtube Base Parser   ---//
function youtubeParse(html, callback) {
    //---   Replace Encoded Characters   ---///
    html = html.replace(/\\x([0-9A-F]{2})/ig, (...items) => { return String.fromCharCode(parseInt(items[1], 16)); });
    //---   Properly Format JSON   ---//
    html = html.replaceAll("\\\\\"", "");
    //---   Parse JSON   ---//
    html = JSON.parse(html);

    //---   Get Results   ---// ( Thanks To appit-online On Github ) -> https://github.com/appit-online/youtube-search/blob/master/src/lib/search.ts
    let results;
    if (html && html.contents && html.contents.sectionListRenderer && html.contents.sectionListRenderer.contents &&
        html.contents.sectionListRenderer.contents.length > 0 &&
        html.contents.sectionListRenderer.contents[0].itemSectionRenderer &&
        html.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.length > 0) {
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
        } catch (e) {}
    }
}

//---   Search Main Function   ---//
function youtubeSearch(text, callback) {
    Http.request({
            method: 'GET',
            url: `${constants.URLS.YT_URL}/results`,
            params: { q: text, hl: "en" }
        })
        .then((res) => {
            //---   Get HTML Only   ---//
            let html = res.data;
            //---   Isolate The Script Containing Video Information   ---//
            html = html.split("var ytInitialData = '")[1].split("';</script>")[0];

            youtubeParse(html, (data) => {
                callback(data);
            })



        })
        .catch((err) => {
            logger("search", err, true);
            callback(err);
        });
}

const searchModule = {
    logs: new Array(),

    //---   Get YouTube's Search Auto Complete   ---//
    autoComplete(text, callback) {
        Http.request({
                method: 'GET',
                url: `${constants.URLS.YT_SUGGESTIONS}/search`,
                params: { client: 'youtube', q: text }
            })
            .then((res) => {
                logger("autoComplete", res);
                callback(res.data);
            })
            .catch((err) => {
                logger("autoComplete", err, true);
                callback(err);
            });
    },

    search(text, callback) {

        let results = new Array();
        youtubeSearch(text, (videos) => {
            for (const i in videos) {
                const video = videos[i];

                if (video.compactVideoRenderer) {
                    //---   If Entry Is A Video   ---//
                    results.push({
                        id: video.compactVideoRenderer.videoId,
                        title: video.compactVideoRenderer.title.runs[0].text,
                        runtime: video.compactVideoRenderer.lengthText.runs[0].text,
                        uploaded: video.compactVideoRenderer.publishedTimeText.runs[0].text,
                        views: video.compactVideoRenderer.viewCountText.runs[0].text,
                        thumbnails: video.compactVideoRenderer.thumbnail.thumbnails
                    })
                } else {
                    //---   If Entry Is Not A Video   ---//
                    //logger("search", { type: "Error Caught Successfully", error: video }, true);
                }


            }
        })
        callback(results);

    },

    getVideo(id) {
        return id;
    }

}

//---   Recommendations   --//

let InnertubeAPI;

// Lazy loads Innertube object. This will be the object used in all future Innertube API calls. Code provided by Lightfire228 (https://github.com/Lightfire228)
// These are just a way for the backend Javascript to communicate with the front end Vue scripts. Essentially a wrapper inside a wrapper
const recommendationModule = {

    async getAPI() {
        InnertubeAPI = await Innertube.createAsync((message, isError) => { logger("Innertube", message, isError); })
        console.log(InnertubeAPI)
        return InnertubeAPI;
    },

    async getVid(id) {
        console.log(InnertubeAPI)
        return InnertubeAPI.getVidInfoAsync(id).data;
    },

    async recommend() {
        console.log(InnertubeAPI)
        return InnertubeAPI.getRecommendationsAsync();
    },
}

//---   Start   ---//
export default ({ app }, inject) => {
    inject('youtube', {...searchModule, ...recommendationModule })
    inject("logger", logger)
}
logger("Initialize", "Program Started");