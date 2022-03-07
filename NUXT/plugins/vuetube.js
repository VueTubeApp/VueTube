//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';

const module = {

  //---   Get GitHub Commits   ---//
  commits(callback) {
    Http.request({
      method: 'GET',
      url: "https://api.github.com/repos/Frontesque/VueTube/commits",
      params: { }
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
