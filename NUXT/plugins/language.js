function module(text) {
  const selectedLanguage = localStorage.getItem(text) || "english";
  const languagePack = require('./languages/'+selectedLanguage);

  if (!text) return languagePack;
  return languagePack[text];

}

export default ({ app }, inject) => {
  inject("lang", module);
};
