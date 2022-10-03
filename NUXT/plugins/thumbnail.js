class Thumbnail {
  getThumbnail(id, resolution, backupThumbnail) {
    if (resolution == "max") {
      const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      let img = new Image();
      img.src = url;
      img.onload = function () {
        if (img.height !== 120) return url;
      };
    }
    if (backupThumbnail[backupThumbnail.length - 1])
      return backupThumbnail[backupThumbnail.length - 1].url;
    else return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
}

export default Thumbnail;
