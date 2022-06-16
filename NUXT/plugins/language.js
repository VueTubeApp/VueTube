const packs = {
  english: require('./languages/english'),
  italian: require('./languages/italian'),
  macedonian:  require('./languages/macedonian'),
  polish:  require('./languages/polish'),
  spanish: require('./languages/spanish'),
  "chinese-traditional": require('./languages/chinese-traditional')
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
