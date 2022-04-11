// General utility functions for the renderers
class rendererUtils {
  static getNavigationEndpoints(base) {
    const navEndpoint = base.navigationEndpoint;
    if (!navEndpoint) return;
    if (navEndpoint.urlEndpoint) {
      const params = new Proxy(
        new URLSearchParams(navEndpoint.urlEndpoint.url),
        {
          get: (searchParams, prop) => searchParams.get(prop),
        }
      );
      if (params.q) return decodeURI(params.q);
      else return new URL(navEndpoint.urlEndpoint.url).pathname;
    } else if (navEndpoint.browseEndpoint) {
      return navEndpoint.browseEndpoint.canonicalBaseUrl;
    } else if (navEndpoint.watchEndpoint) {
      return `/watch?v=${navEndpoint.watchEndpoint.videoId}`;
    } else if (navEndpoint.navigationEndpoint) {
      return; //for now
    } else if (navEndpoint.searchEndpoint) {
      return `/search?q=${encodeURI(navEndpoint.searchEndpoint.query)}`;
    }
  }

  static checkInternal(base) {
    const tmp = document.createElement("a");
    tmp.href = this.getNavigationEndpoints(base);
    if (tmp.host !== window.location.host || !base.navigationEndpoint) {
      return false;
    } else {
      return true;
    }
  }
}

export default rendererUtils;
