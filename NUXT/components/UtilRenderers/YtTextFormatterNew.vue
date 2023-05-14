<template>
  <div class="yt-text-formatter">
    <p v-html="formatTitle">
      {{ textRuns.content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    textRuns: {},
    additionalInfo: {},
  },
  emits: ["play", "pause"],
  data: () => ({
    paused: false,
  }),
  computed: {
    formatTitle() {
      let img =
        "<img src = 'https://www.gstatic.com/youtube/img/watch/yt_favicon.png' style=\"height: 10px; width: 14px;\"/>";
      if (this.textRuns.content && this.textRuns.commandRuns) {
        let tempContent = this.textRuns.content;
        let arrayWithReplaceParts = [];
        this.textRuns.commandRuns.forEach((commandRun) => {
          //[textToReplace, urlFromEndpoint]
          const textBeforeReplace = this.textRuns.content.substring(
            commandRun.startIndex,
            commandRun.startIndex + commandRun.length
          );
          // console.log("isExistInArray "+ textBeforeReplace + ": " + isExistInArray);
          if (commandRun.onTap.innertubeCommand.commandMetadata) {
            arrayWithReplaceParts.push([
              textBeforeReplace,
              commandRun.onTap.innertubeCommand.commandMetadata
                .webCommandMetadata.url,
            ]);
          } else if (commandRun.onTap.innertubeCommand.urlEndpoint) {
            arrayWithReplaceParts.push([
              this.textRuns.content.substring(
                commandRun.startIndex,
                commandRun.startIndex + commandRun.length
              ),
              commandRun.onTap.innertubeCommand.urlEndpoint.url,
            ]);
          }
        });

        const duplicates = [];
        arrayWithReplaceParts = arrayWithReplaceParts.filter((subArr) => {
          const isFirstElementDuplicate = duplicates.includes(subArr[0]);
          if (isFirstElementDuplicate) {
            return false;
          } else {
            duplicates.push(subArr[0]);
            return true;
          }
        });
        console.log(arrayWithReplaceParts);
        for (let i = 0; i < arrayWithReplaceParts.length; i++) {
          for (let j = i + 1; j < arrayWithReplaceParts.length; j++) {
            if (
              JSON.stringify(arrayWithReplaceParts[i]) ===
              JSON.stringify(arrayWithReplaceParts[j])
            ) {
              arrayWithReplaceParts.splice(j, 1);
              j--;
            }
          }
        }

        // Replacing urls in description
        arrayWithReplaceParts.forEach((text) => {
          if (text[1].indexOf("/hashtag/") > -1) {
            //skip
          } else if (text[1].indexOf("watch?v=") > -1) {
            let nameOfUrl = text[0].replace(/   •/, " •");
            let newUrl =
              "<a" +
              ' onclick=openInternal("' +
              text[1] +
              '") style="background-color: rgba(0,0,0,0.051); border-radius: 8px; white-space: nowrap;">' +
              img +
              nameOfUrl +
              "</a>";
            tempContent = tempContent.replaceAll(text[0], newUrl);
          } else if (
            text[1].indexOf("/channel/") > -1 ||
            text[1].indexOf("youtube.com/c/") > -1
          ) {
            let nameOfUrl = text[0].replace(/   /, " ");
            // let newUrl =
            //   "<a" + ' onclick=openInternal("' + text[1] + '") style="background-color: rgba(0,0,0,0.051); border-radius: 8px; white-space: nowrap;">' + img + nameOfUrl + "</a>";

            // Temporary
            let newUrl =
              "<a" +
              ' onclick=openInternal("channel") style="background-color: rgba(0,0,0,0.051); border-radius: 8px; white-space: nowrap;">' +
              img +
              nameOfUrl +
              "</a>";
            tempContent = tempContent.replaceAll(text[0], newUrl);
          } else {
            let params = new Proxy(new URLSearchParams(text[1]), {
              get: (searchParams, prop) => searchParams.get(prop),
            });
            let url = decodeURI(params.q);
            let newUrl =
              "<a" + ' onclick=openExternal("' + url + '")>' + text[0] + "</a>";
            tempContent = tempContent.replaceAll(text[0], newUrl);
          }
        });
        return tempContent;
      } else {
        return this.textRuns.content;
      }
    },
  },
  created() {
    window.openExternal = this.openExternal;
    window.openInternal = this.openInternal;
  },
  methods: {
    openExternal(url) {
      this.$vuetube.openExternal(url);
    },
    async openInternal(url) {
      await this.$router.push(url);
    },
  },
};
</script>
