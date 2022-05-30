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


  //---   List Plugins   ---//
  list: new Promise(async (resolve, reject) => {

    if (await !ensureStructure) reject("Invalid Structure");

    const plugins = await Filesystem.readdir({
      path: "vuetube/plugins/",
      directory: APP_DIRECTORY
    });
    resolve(plugins);

  })



};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
