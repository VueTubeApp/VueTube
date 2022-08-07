//---   Modules/Imports   ---//
import { Http } from "@capacitor-community/http";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

module = (url) => {
  return new Promise(async (resolve, reject) => {

    //---   Download File From GitHub & Save to Memory/RAM   ---//
    const data = await Http.get({
      url: url,
      responseType: "blob",
      observe: "events"
    }).catch(err => { return reject(err); });

    //---   Write File From Memory to Local Storage   ---//
    const fileData = data.data.toString('utf8');
    const app = await Filesystem.writeFile({
      path: "vuetube-update.apk",
      directory: Directory.Documents,
      data: fileData
    }).catch(err => { return reject(err); });

    //---   Open Written File   ---//
    console.log(app.uri)
    window.open(app.uri, "_blank");

  })
}

//---   Start   ---//
export default ({ app }, inject) => {
  inject("update", module);
};
