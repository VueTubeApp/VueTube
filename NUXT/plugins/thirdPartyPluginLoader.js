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

    Filesystem.readdir({
      path: fs.plugins,
      directory: APP_DIRECTORY,
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    });


  }),

  async addPlugin(content) {
    await ensureStructure;
    new Promise(async (resolve, reject) => {
      const fileName = require("./utils").getCpn(); // Im not sure what this is actually meant for but im using it as a random string generator
      console.log("Saving Plugin As" + fileName);
      await Filesystem.writeFile({
        path: fs.plugins + fileName + ".js",
        directory: APP_DIRECTORY,
        data: content,
        encoding: Encoding.UTF8,
      });
      resolve();
    });
  },

  async removePlugin(name) {
    await ensureStructure;
    new Promise(async (resolve, reject) => {
      await Filesystem.deleteFile({
        path: fs.plugins + name,
        directory: APP_DIRECTORY,
      });
      resolve();
    });
  },

};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
