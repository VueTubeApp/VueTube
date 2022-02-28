//---   Modules/Imports   ---//
import { Http } from '@capacitor-community/http';

//---   Logger Function   ---//
function logger(func, data) {
  module.logs.push({
    name: func,
    time: Date.now(),
    data: data
  })
}

const module = {
  logs: new Array(),

  //---   Get YouTube's Search Auto Complete   ---//
  async autoComplete(text, callback) {
    const res = await Http.request({
      method: 'GET',
      url: 'https://suggestqueries-clients6.youtube.com/complete/search',
      params: { client: 'youtube', q: text }
    });
    logger("autoComplete", res);
    callback(res);
  }
}

//---   Start   ---//
export default ({ app }, inject) => {
  inject('youtube', module)
}
logger("Initialize","Program Started");
