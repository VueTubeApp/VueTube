//---   Modules/Imports   ---//

const module = {


  //---   Get Plugins   ---//
  list: new Promise((resolve, reject) => {
    let plugins = new Array();
    
    // Temp Plugin List
    plugins.push(require("~/plugins/tempPlugins/demoPlugin"))
    // End Temp Plugin List

    resolve(plugins);

  })
  //---   End Get Plugins   ---//



};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("tppl", module);
};
