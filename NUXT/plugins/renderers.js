// General utility functions for the renderers
class rendererUtils {
  static getNavigationEndpoints(base) {
    if (!base) return;
    if (base.urlEndpoint) {
      const params = new Proxy(new URLSearchParams(base.urlEndpoint.url), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      if (params.q) return decodeURI(params.q);
      else return new URL(base.urlEndpoint.url).pathname;
    } else if (base.browseEndpoint) {
      return base.browseEndpoint.canonicalBaseUrl;
    } else if (base.watchEndpoint) {
      return `/watch?v=${base.watchEndpoint.videoId}`;
    } else if (base.navigationEndpoint) {
      return; //for now
    } else if (base.searchEndpoint) {
      return `/search?q=${encodeURI(base.searchEndpoint.query)}`;
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
