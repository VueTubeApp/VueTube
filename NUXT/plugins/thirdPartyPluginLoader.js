//---   Modules/Imports   ---//
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { fs } from './constants';

//---   Set Up App Directory   ---//
const APP_DIRECTORY = Directory.Documents;


const ensureStructure = new Promise(async (resolve, reject) => {
  const perms = await Filesystem.checkPermissions();
  if (perms.publicStorage !== "granted") {
    perms = await Filesystem.requestPermissions();
  }

  //---   Ensure Plugins Folder   ---//
  try {
    await Filesystem.mkdir({
      directory: APP_DIRECTORY, recursive: true,
      path: fs.plugins,
    });
  } catch (e) { /* Exists */ }

  //---   Ensure Temp Folder   ---//
  try {
    await Filesystem.mkdir({
      directory: APP_DIRECTORY, recursive: true,
      path: fs.temp,
    });
  } catch (e) { /* Exists */ }

  perms
    ? resolve(true)
    : reject(false)

})


const module = {


  //---   Get Plugins   ---//
  list: new Promise(async (resolve, reject) => {
    let plugins = new Array();

    if (await !ensureStructure) reject("Invalid Structure");

    // Temp Plugin List
    plugins = Filesystem.readdir({
      directory: APP_DIRECTORY,
      path: fs.plugins
    })
    // End Temp Plugin List
    resolve(plugins);
  }),
  //---   End Get Plugins   ---//

  //---   Delete Plugin   ---//
  list: async (pluginName) => {

    console.log(fs.plugins);
    /*
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    */

  }



};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
