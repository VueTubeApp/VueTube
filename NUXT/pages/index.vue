<template>
  <div>
    <video controls :src="vidSrc" width="100%" height="300vh" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      vidSrc: "https://rr3---sn-ab5l6n6e.googlevideo.com/videoplayback?expire=1643101048&ei=F2fvYbegO4ythgbf6prgBw&ip=8.46.116.241&id=o-AKy6hy3pwbh5E7Q2oSThJtnBpBYdVDthEzO--siU1Pzb&itag=22&source=youtube&requiressl=yes&mh=3J&mm=31%2C29&mn=sn-ab5l6n6e%2Csn-ab5szn7l&ms=au%2Crdu&mv=m&mvi=3&pl=24&initcwndbps=1512500&vprv=1&mime=video%2Fmp4&ns=NmcjQCgOge6h_ERTK6R9hdcG&ratebypass=yes&dur=493.052&lmt=1631287826858240&mt=1643078960&fvip=3&fexp=24001373%2C24007246&c=WEB&txp=5532434&n=iEKpKJGuEiIbn0FFd167&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMUsO4Jl50Kcm1ReQjtB7x5OcruOrJ6zs22OtXMhKER8AiA4H2VsoSePLS_uCSM4a4kpjGUTm4_CRPg_PJn_MIVXfw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhANGPdRlpAaW0kbCGaYOBacI8cFUkh49Eo3YgJN4_T3X_AiBU_LqddZ7VkX1vktQBR4ul2jGvI16oLA8rH3InKzAPEg%3D%3D"
    }
  }
}
</script>
