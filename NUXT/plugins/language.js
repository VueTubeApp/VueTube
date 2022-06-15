const packs = {
  english: require('./languages/english'),
  spanish: require('./languages/spanish'),
  italian: require('./languages/italian'),
  polish:  require('./languages/polish')
}

function module(text, listPacks) {

  //---   List All Packs   ---//
  if (listPacks) return packs;

  //---   Return Language Pack   ---//
  const selectedLanguage = localStorage.getItem("language") || "english";
  const languagePack = packs(selectedLanguage);

  if (!text) return languagePack;
  return languagePack[text];

}

export default ({ app }, inject) => {
  inject("lang", module);
};
