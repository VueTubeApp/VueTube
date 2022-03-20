// To centeralize certain values and URLs as for easier debugging and refactoring

const url = {
    YT_URL: 'https://www.youtube.com',
    YT_MOBILE: "https://m.youtube.com",
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

    LOGGER_NAMES: {
        search: "Search",
        autoComplete: "AutoComplete",
        recommendations: "Recommendations",
        init: "Initialize",
        innertube: "Innertube"
    },

    INNERTUBE_HEADER: (info) => {
        let headers = {
            accept: '*/*',
            'user-agent': info.userAgent,
            'content-type': 'application/json',
            'accept-language': `${info.hl}-${info.gl},${info.hl};q=0.9`,
            'x-goog-authuser': 0,
            'x-goog-visitor-id': info.visitorData,
            'x-youtube-client-name': ytApiVal.CLIENTNAME,
            'x-youtube-client-version': ytApiVal.VERSION,
            'x-origin': info.originalUrl,
            origin: info.originalUrl,
            // referer: 'https://m.youtube.com/watch?v=U-9M-BjFYMc'
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
            "originalUrl": info.originalUrl,
            "configInfo": info.configInfo,
            "remoteHost": info.remoteHost,
            "visitorData": info.visitorData,
        };
        return client
    }
}