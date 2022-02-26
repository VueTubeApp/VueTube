import { Http } from '@capacitor-community/http';

const module = {
  async autoComplete(text, callback) {

    const options = {
      url: 'https://suggestqueries-clients6.youtube.com/complete/search',
      params: { client: 'youtube', q: text },
    };
    const response = await Http.request(options);
    callback(response)

  }
}

export default ({ app }, inject) => {
  inject('youtube', module)
}
