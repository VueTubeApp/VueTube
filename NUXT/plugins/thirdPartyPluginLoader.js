//---   Modules/Imports   ---//
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { fs } from './constants';

//---   Set Up App Directory   ---//
const APP_DIRECTORY = Directory.Data;


const ensureStructure = new Promise(async (resolve, reject) => {
  /*
  const perms = await Filesystem.checkPermissions();
  if (perms.publicStorage !== "granted") {
    perms = await Filesystem.requestPermissions();
  }
  // Legacy shit that isnt supported on android 10+   */ 

  //---   Ensure Plugins Folder   ---//
  try {
    await Filesystem.mkdir({
      directory: APP_DIRECTORY, recursive: true,
      path: fs.plugins,
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
      path: fs.plugins,
      directory: APP_DIRECTORY
    });
    resolve(plugins);

  }),

  debug(path) { return new Promise(async (resolve, reject) => {

    if (await !ensureStructure) reject("Invalid Structure");
  
    const plugins = await Filesystem.readdir({
      path: path,
      directory: APP_DIRECTORY
    });
    resolve(plugins);
  
  })}



};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
