// Code specific to working with the innertube API
// https://www.youtube.com/youtubei/v1

import { Http } from '@capacitor-community/http';
import { getBetweenStrings } from './utils';
import constants from '../static/constants';

class Innertube {

    //--- Initiation ---//

    constructor(ErrorCallback) {
        this.ErrorCallback = ErrorCallback || undefined;
        this.retry_count = 0
    }

    checkErrorCallback() {
        return typeof this.ErrorCallback === "function"
    }

    init() {
        Http.get({ url: constants.URLS.YT_URL, params: { hl: "en" } })
            .then(result => {
                if (result instanceof Error && this.checkErrorCallback) this.ErrorCallback(result.message, true);
                try {
                    const data = JSON.parse(getBetweenStrings(result.data, 'ytcfg.set(', ');'));
                    if (data.INNERTUBE_CONTEXT) {
                        this.key = data.INNERTUBE_API_KEY;
                        this.context = data.INNERTUBE_CONTEXT;
                        this.context.client.clientName = "ANDROID";
                        this.context.client.clientVersion = "16.25";
                    }

                } catch (err) {
                    console.log(err)
                    if (this.checkErrorCallback) this.ErrorCallback(err, true)
                    if (this.retry_count >= 10) { this.init() } else { if (this.checkErrorCallback) this.ErrorCallback("Failed to retrieve Innertube session", true); }
                }
            })
            .catch((error) => error);
    };

    static create(ErrorCallback) {
        const created = new Innertube(ErrorCallback);
        created.init();
        return created;
    }

    //--- API Calls ---//

    async browse(action_type) {
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

        if (response instanceof Error) return { success: false, status_code: response.response.status, message: response.message };

        return {
            success: true,
            status_code: response.status,
            data: response.data
        };
    }

    async getVidInfo(id) {
        let data = { context: this.context, videoId: id }

        const response = await Http.post({
            url: `${constants.URLS.YT_BASE_API}/player?key=${this.key}`,
            data: data,
            headers: { "Content-Type": "application/json" }
        }).catch((error) => error);

        if (response instanceof Error) return { success: false, status_code: response.response.status, message: response.message };

        return {
            success: true,
            status_code: response.status,
            data: response.data
        };
    }

    // Simple Wrappers
    async getRecommendations() {
        return await this.browse("recommendations")
    }


}

export default Innertube;