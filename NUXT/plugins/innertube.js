// Code specific to working with the innertube API
// https://www.youtube.com/youtubei/v1

import { Http } from '@capacitor-community/http';
import { getBetweenStrings } from './utils';

class Innertube {
    constructor(ErrorCallback) {
        this.ErrorCallback = ErrorCallback;
        this.init();
        this.retry_count = 0
    }

    async init() {
        const html = await Http.get({ url: 'https://www.youtube.com', params: { hl: "en" } }).catch((error) => error);
        if (html instanceof Error) this.ErrorCallback(html.message, true);
        try {
            const data = JSON.parse(getBetweenStrings(html.data, 'ytcfg.set(', ');'));
            if (data.INNERTUBE_CONTEXT) {
                this.key = data.INNERTUBE_API_KEY;
                this.context = data.INNERTUBE_CONTEXT;
                this.context["clientName"] = "ANDROID";
                this.context["clientVersion"] = "16.25";
            }

        } catch (err) {
            console.log(err)
            this.ErrorCallback(err, true)
            this.retry_count >= 10 ? this.init() : this.ErrorCallback("Failed to retrieve Innertube session", true);
        }
    };

    static async create(ErrorCallback) {
        const created = new Innertube(ErrorCallback);
        await created.init();
        return created;
    }

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
            url: `https://www.youtube.com/youtubei/v1/browse?key=${this.key}`,
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

    async getRecommendations() {
        const response = await this.browse("recommendations")
        return response.data;
    }


}

export default Innertube;