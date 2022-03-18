//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';
import constants from '../static/constants';

const module = {

    //---   Get GitHub Commits   ---//
    commits: new Promise((resolve, reject) => {

        Http.request({
                method: 'GET',
                url: `${constants.URLS.VT_GITHUB}/commits`,
                params: {}
            })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });

    }),

    getRuns(item, callback) {

        let url = `${constants.URLS.VT_GITHUB}/commits/${item.sha}/check-runs`;

        Http.request({
                method: 'GET',
                url: url,
                params: {}
            })
            .then((res) => {
                callback(res.data)
            })
            .catch((err) => {
                callback(err)
            });

    }

}

//---   Start   ---//
export default ({ app }, inject) => {
    inject('vuetube', module)
}