<template>
  <div>
    <video controls :src="vidSrc" width="100%" height="300vh" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      vidSrc: "https://rr3---sn-ab5szne7.googlevideo.com/videoplayback?expire=1645763099&ei=uwUYYtSHI4LfhwaEnZ6ABg&ip=8.21.13.5&id=o-AEmRDpMZh3cbaO01nQqiY1Q-kA-3bLYhqXdVj-cRdCF3&itag=22&source=youtube&requiressl=yes&mh=Sw&mm=31%2C26&mn=sn-ab5szne7%2Csn-5uaeznyy&ms=au%2Conr&mv=m&mvi=3&pl=24&initcwndbps=2280000&vprv=1&mime=video%2Fmp4&ns=Q5aWzxFtqjKcRjIYToDTXRIG&ratebypass=yes&dur=51.432&lmt=1644587734017831&mt=1645741264&fvip=3&fexp=24001373%2C24007246&c=WEB&txp=5532434&n=-SThIpytHrY1AZDfq&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgYobPMzfuSBig1g__YwPOiKuNwDnMclv_kqfFLxXra-ACIQCcVOIHCfRcI98Wf_g1wdTCLMDBnOzdBtPL8kTsenjIIQ%3D%3D&sig=AOq0QJ8wRQIgJKQpvQMxCy-o_JsoSkirjx9cXOODoieVIXnnDugZBiMCIQDtIs-ggQJd5ZTXl6gVuAZxju9hh5dSRENbSIT6rgsfaw%3D%3D"
    }
  }
}
</script>
