// Code specific to working with the innertube API
// https://www.youtube.com/youtubei/v1

import { Http } from '@capacitor-community/http';
import { getBetweenStrings } from './utils';
import constants from './constants';

class Innertube {

    //--- Initiation ---//

    constructor(ErrorCallback) {
        this.ErrorCallback = ErrorCallback || undefined;
        this.retry_count = 0
    }

    checkErrorCallback() {
        return typeof this.ErrorCallback === "function"
    }

    async initAsync() {
        const html = await Http.get({ url: constants.URLS.YT_URL, params: { hl: "en" } }).catch((error) => error);
        try {
            if (html instanceof Error && this.checkErrorCallback) this.ErrorCallback(html.message, true);
            try {
                const data = JSON.parse(getBetweenStrings(html.data, 'ytcfg.set(', ');'));
                if (data.INNERTUBE_CONTEXT) {
                    this.key = data.INNERTUBE_API_KEY;
                    this.context = data.INNERTUBE_CONTEXT;
                    this.context.client = constants.INNERTUBE_CLIENT(this.context.client)
                    this.header = constants.INNERTUBE_HEADER(this.context.client)
                }

            } catch (err) {
                console.log(err)
                if (this.checkErrorCallback) this.ErrorCallback(err, true)
                if (this.retry_count >= 10) { this.initAsync() } else { if (this.checkErrorCallback) this.ErrorCallback("Failed to retrieve Innertube session", true); }
            }
        } catch (error) {
            this.ErrorCallback(error, true)
        };
    };

    static async createAsync(ErrorCallback) {
        const created = new Innertube(ErrorCallback);
        await created.initAsync();
        return created;
    }

    //--- API Calls ---//

    async browseAsync(action_type) {
        let data = { context: this.context }

        switch (action_type) {
            case 'recommendations':
                data.browseId = 'FEwhat_to_watch'
                break;
            case 'playlist':
                data.browseId = args.browse_id
                break;
            default:
        }

        console.log(data)

        const response = await Http.post({
            url: `${constants.URLS.YT_BASE_API}/browse?key=${this.key}`,
            data: data,
            headers: { "Content-Type": "application/json" }
        }).catch((error) => error);

        if (response instanceof Error) return { success: false, status_code: response.status, message: response.message };

        return {
            success: true,
            status_code: response.status,
            data: response.data
        };
    }

    static getThumbnail(id, resolution) {
            if (resolution == "max"){
                const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
                let img = new Image();
                img.src = url
                img.onload = function(){
                    if (img.height !== 120) return url
                };
            }
            return `https://img.youtube.com/vi/${id}/mqdefault.jpg`
        }
    

    async getVidAsync(id) {

        // const url = `${constants.URLS.YT_MOBILE}/watch?v=${id}&t=8s&pbj=1`
        // console.log(url)
        // const response = await Http.get({
        //     url: url,
        //     params: {},
        //     headers: Object.assign({"referer": url}, this.header)
        // }).catch((error) => error)
        const response = await Http.get({
            url: `https://m.youtube.com/watch?v=${id}&t=8s&pbj=1`,
            params: {},
            headers: {
                accept: '*/*',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; WP7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36',
                'content-type': 'application/json',
                'accept-language': 'en-US,en;q=0.9',
                'x-goog-authuser': 0,
                'x-goog-visitor-id': 'CgtsaVdQdGhfbVNOMCiC0taRBg%3D%3D',
                'x-youtube-client-name': 2,
                'x-youtube-client-version': '2.20220318.00.00',
                'x-youtube-chrome-connected': 'source=Chrome,mode=0,enable_account_consistency=true,supervised=false,consistency_enabled_by_default=false',
                'x-origin': 'https://m.youtube.com',
                origin: 'https://m.youtube.com',
                referer: `https://m.youtube.com/watch?v=${id}`
            }
        }).catch((error) => error);

        if (response instanceof Error) return { success: false, status_code: response.response.status, message: response.message };

        return {
            success: true,
            status_code: response.status,
            data: response.data
        };
    }

    // Simple Wrappers
    async getRecommendationsAsync() {
        const rec = await this.browseAsync("recommendations");
        console.log(rec.data)
        return rec;
    }

    async VidInfoAsync(id) {
        let response = await this.getVidAsync(id)
        
        if (response.success && (response.data[2].playerResponse?.playabilityStatus?.status == ("ERROR" || undefined))) 
            throw new Error(`Could not get information for video: ${response[2].playerResponse?.playabilityStatus?.status} - ${response[2].playerResponse?.playabilityStatus?.reason}`)
        response = response.data
        const details = response[2].playerResponse?.videoDetails
        const microformat = response[2].playerResponse?.microformat?.playerMicroformatRenderer
        const renderedPanels = response[3].response?.engagementPanels
        const columnUI = response[3].response?.contents.singleColumnWatchNextResults?.results?.results

        console.log((columnUI.contents).length)

        return {
            id: details.videoId,
            title: details.title || microformat.title?.runs[0].text,
            isLive: details.isLiveContent || microformat.liveBroadcastDetails?.isLiveNow || false,
            channelName: details.author || microformat.ownerChannelName,
            channelUrl: microformat.ownerProfileUrl,
            availableResolutions: response[2].playerResponse?.streamingData?.formats,
            availableResolutionsAdaptive: response[2].playerResponse?.streamingData?.adaptiveFormats,
            metadata: {
                description: microformat.description?.runs[0].text,
                descriptionShort: details.shortDescription,
                thumbnails: details.thumbnails?.thumbnails || microformat.thumbnails?.thumbnails,
                isFamilySafe: microformat.isFamilySafe,
                availableCountries: microformat.availableCountries,
                liveBroadcastDetails: microformat.liveBroadcastDetails,
                uploadDate: microformat.uploadDate,
                publishDate: microformat.publishDate,
                isPrivate: details.isPrivate,
                viewCount: details.viewCount || microformat.viewCount,
                lengthSeconds: details.lengthSeconds || microformat.lengthSeconds,
                likes: parseInt(columnUI?.contents[1]
                    .slimVideoMetadataSectionRenderer?.contents[1].slimVideoActionBarRenderer?.buttons[0]
                    .slimMetadataToggleButtonRenderer?.button?.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label?.replace(/\D/g, '')) // Yes. I know.
            },
            renderedData: {
                description: renderedPanels[0].engagementPanelSectionListRenderer?.content.structuredDescriptionContentRenderer?.items[1].expandableVideoDescriptionBodyRenderer?.descriptionBodyText.runs,
                recommendations: columnUI?.contents[(columnUI.contents).length -1].itemSectionRenderer?.contents
            }
        }

    }


}

export default Innertube;