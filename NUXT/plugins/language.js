const packs = {
  english: require('./languages/english'),
  dutch: require('./languages/dutch'),
  german: require('./languages/german'),
  italian: require('./languages/italian'),
  macedonian:  require('./languages/macedonian'),
  malay: require('./languages/malay'),
  polish:  require('./languages/polish'),
  spanish: require('./languages/spanish'),
  "chinese-traditional": require('./languages/chinese-traditional'),
  "chinese-simplified": require('./languages/chinese-simplified'),
  "brazilian-portuguese": require('./languages/brazilian-portuguese'),
}

function module(text, listPacks) {

  //---   List All Packs   ---//
  if (listPacks === true) return packs;

  //---   Return Language Pack   ---//
  const selectedLanguage = localStorage.getItem("language") || "english";
  const languagePack = require('./languages/'+selectedLanguage);

  if (!text) return languagePack;
  return languagePack[text];

}

export default ({ app }, inject) => {
  inject("lang", module);
};
