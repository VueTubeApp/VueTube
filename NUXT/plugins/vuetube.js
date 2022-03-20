//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';
import { StatusBar, Style } from '@capacitor/status-bar';
import constants from './constants';
import { hexToRgb, rgbToHex } from './utils';

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

    },

    statusBar: {
      async hide() {
        return await StatusBar.hide();
      },
      async show() {
        return await StatusBar.show();
      },
      async setLight() {
        return await StatusBar.setStyle({ style: Style.Light });
      },
      async setDark() {
        return await StatusBar.setStyle({ style: Style.Dark });
      },
      async setTransparent() {
        return StatusBar.setOverlaysWebView({ overlay: true });
      },
      async setBackground(color) {
        return await StatusBar.setBackgroundColor({color: color});
      }
    },

    hexToRgb(hex) { return hexToRgb(hex); },
    rgbToHex(r, g, b) { return rgbToHex(r, g, b); }

}

//---   Start   ---//
export default ({ app }, inject) => {
    inject('vuetube', module)
}
