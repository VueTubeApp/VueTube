import { Http } from '@capacitor-community/http';

const module = {
  async autoComplete(text, callback) {

    const response = await Http.request({
      method: 'GET',
      url: 'https://suggestqueries-clients6.youtube.com/complete/search',
      params: { client: 'youtube', q: text }
    });
    callback(response)

  }
}

export default ({ app }, inject) => {
  inject('youtube', module)
}
