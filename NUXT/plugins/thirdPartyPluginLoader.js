//---   Modules/Imports   ---//
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { fs } from "./constants";

//---   Set Up App Directory   ---//
const APP_DIRECTORY = Directory.Data;

//---   Ensure Plugins Folder   ---//
const ensureStructure = new Promise(async (resolve, reject) => {
  try {
    await Filesystem.mkdir({
      directory: APP_DIRECTORY,
      recursive: true,
      path: fs.plugins,
    });
  } catch (e) {
    /* Exists */
  }

  resolve();
});

const module = {
  //---   List Plugins   ---//
  list: new Promise(async (resolve, reject) => {
    await ensureStructure;

    const plugins = await Filesystem.readdir({
      path: fs.plugins,
      directory: APP_DIRECTORY,
    }).catch((err) => {
      reject(err);
    });
    resolve(plugins);
  }),

  async addPlugin(content) {
    await ensureStructure;
    new Promise(async (resolve, reject) => {
      const fileName = require("./utils").getCpn(); // Im not sure what this is actually meant for but im using it as a random string generator
      console.log("Saving Plugin As" + fileName);
      await Filesystem.writeFile({
        path: fs.plugins + "/" + fileName + ".js",
        directory: APP_DIRECTORY,
        data: content,
        encoding: Encoding.UTF8,
      });
    });
  },
};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
