// To centeralize certain values and URLs as for easier debugging and refactoring

const url = {
    YT_URL: 'https://www.youtube.com',
    YT_MUSIC_URL: 'https://music.youtube.com',
    YT_BASE_API: 'https://www.youtube.com/youtubei/v1',
    YT_SUGGESTIONS: "https://suggestqueries.google.com/complete",
    VT_GITHUB: "https://api.github.com/repos/Frontesque/VueTube",
}

const ytApiVal = {
    VERSION: "16.25",
    CLIENTNAME: "ANDROID",
}

module.exports = {
    URLS: url,
    YT_API_VALUES: ytApiVal,

    INNERTUBE_HEADER: (info) => {
        let headers = {
            'accept': '*/*',
            'user-agent': info.client.userAgent,
            'content-type': 'application/json',
            'x-goog-authuser': 0,
            'x-youtube-client-name': 2,
            'x-youtube-client-version': info.client.clientVersion,
            'x-youtube-chrome-connected': 'source=Chrome,mode=0,enable_account_consistency=true,supervised=false,consistency_enabled_by_default=false',
        };
        return headers
    },

    INNERTUBE_CLIENT: (info) => {
        let client = {
            "gl": info.gl,
            "hl": info.hl,
            "deviceMake": info.deviceMake,
            "deviceModel": info.deviceModel,
            "userAgent": info.userAgent,
            "clientName": ytApiVal.CLIENTNAME,
            "clientVersion": ytApiVal.VERSION,
            "osName": info.osName,
            "osVersion": info.osVersion,
            "platform": "MOBILE",
            "originalUrl": info.originalUrl
        };
        return client
    }
}