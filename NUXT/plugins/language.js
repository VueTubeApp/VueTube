const packs = {
  arabic: require("./languages/arabic"),
  azerbaijan: require("./languages/azerbaijan"),
  "brazilian-portuguese": require("./languages/brazilian-portuguese"),
  bulgarian: require("./languages/bulgarian"),
  "chinese-simplified": require("./languages/chinese-simplified"),
  "chinese-traditional": require("./languages/chinese-traditional"),
  czech: require("./languages/czech"),
  dutch: require("./languages/dutch"),
  english: require("./languages/english"),
  estonian: require("./languages/estonian"),
  "french-fr": require("./languages/french-fr"),
  german: require("./languages/german"),
  hindi: require("./languages/hindi"),
  marathi: require("./languages/marathi"),
  hungarian: require("./languages/hungarian"),
  indonesian: require("./languages/indonesian"),
  italian: require("./languages/italian"),
  japanese: require("./languages/japanese"),
  korean: require("./languages/korean"),
  macedonian: require("./languages/macedonian"),
  malay: require("./languages/malay"),
  polish: require("./languages/polish"),
  romanian: require("./languages/romanian"),
  russian: require("./languages/russian"),
  serbian: require("./languages/serbian"),
  spanish: require("./languages/spanish"),
  tamil: require("./languages/tamil"),
  turkish: require("./languages/turkish"),
  ukrainian: require("./languages/ukrainian"),
  vietnamese: require("./languages/vietnamese"),
};

function module(subPack, listPacks) {
  //---   List All Packs   ---//
  if (listPacks === true) return packs;

  //---   Return Language Pack   ---//
  const selectedLanguage = localStorage.getItem("language") || "english";
  const languagePack = packs[selectedLanguage];

  //---   Send Full Language Pack   ---//
  if (!subPack) return languagePack;
  //---   Allow Subpack Fallback   ---//
  let builtSubPack = new Object();
  for (const i in packs.english[subPack]) {
    const englishEntry = packs.english[subPack][i];
    const entry = languagePack[subPack][i];

    if (!entry) {
      builtSubPack[i] = englishEntry;
    } else {
      builtSubPack[i] = entry;
    }


  }
  //---   Return Built Subpack   ---//
  console.log("RETURNING:",builtSubPack)
  return builtSubPack;
}

export default ({ app }, inject) => {
  inject("lang", module);
};
