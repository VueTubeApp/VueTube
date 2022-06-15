const packs = {
  english: require('./languages/english'),
  spanish: require('./languages/spanish'),
  italian: require('./languages/italian'),
  polish:  require('./languages/polish')
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
