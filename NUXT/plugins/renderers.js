// General utility functions for the renderers
class rendererUtils {
  static getNavigationEndpoints(base) {
    const navEndpoint = base.navigationEndpoint;
    if (!navEndpoint) return;
    if (navEndpoint.webviewEndpoint) {
      return navEndpoint.webviewEndpoint.url;
    } else if (navEndpoint.browseEndpoint) {
      return navEndpoint.browseEndpoint.canonicalBaseUrl;
    } else if (navEndpoint.watchEndpoint) {
      return `/watch?v=${navEndpoint.watchEndpoint.videoId}`;
    } else if (navEndpoint.navigationEndpoint) {
      return; //for now
    }
  }

  static checkInternal(base) {
    const navEndpoint = base.navigationEndpoint;
    if (!navEndpoint) return false;
    if (navEndpoint.browseEndpoint || navEndpoint.watchEndpoint) {
      return true;
    } else {
      return false;
    }
  }
}

export default rendererUtils;
