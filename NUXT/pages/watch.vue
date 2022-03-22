<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" style="max-height: 50vh" />
    <v-card v-if="loaded" class="ml-2 mr-2 background" flat>
      <v-card-title class="mt-2"
        style="padding-top: 0; padding-bottom: 0; font-size: 0.95rem; line-height: 1rem;"
        v-text="title"
      />
      <v-card-text>
        <div style="margin-bottom: 1rem;">{{ views }} views • {{ uploaded }}</div>

        <!--   Scrolling Div For Interactions   --->
        <div style="display: flex; margin-bottom: 1em">
          <v-list-item
            v-for="(item, index) in interactions"
            :key="index"
            style="padding: 0; flex: 0 0 20%"
          >
            <v-btn
              text
              class="vertical-button"
              style="padding: 0; margin: 0"
              elevation="0"
              :disabled="item.disabled"
              @click="callMethodByName(item.actionName)"
            >
              <v-icon v-text="item.icon" />
              <div class="mt-2" style="font-size: .66rem;" v-text="item.value || item.name" />
            </v-btn>
          </v-list-item>

          <v-spacer />
          <v-btn text @click="showMore = !showMore">
            <v-icon v-if="showMore">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <!--   End Scrolling Div For Interactions   --->
        <!-- <hr /> -->
        <p>Channel Stuff</p>
      </v-card-text>
      <div v-if="showMore" class="scroll-y ml-2 mr-2">
        {{ description }}
      </div>

      <!-- <v-bottom-sheet
        v-model="showMore"
        color="accent"
        style="z-index: 9999999"
      >
        <v-sheet style="padding: 1em">
          <v-btn block @click="showMore = !showMore"
            ><v-icon>mdi-chevron-down</v-icon></v-btn
          ><br />

          <div class="scroll-y">
            {{ description }}
          </div>
        </v-sheet>
      </v-bottom-sheet> -->
      <!-- <v-bottom-sheet v-model="share" color="accent" style="z-index: 9999999">
        <v-sheet style="padding: 1em">
          <div class="scroll-y">
            {{ description }}
          </div>
        </v-sheet>
      </v-bottom-sheet> -->
    </v-card>

    <recommended :recommends="recommends" />
  </div>
</template>

<style>
.vertical-button span.v-btn__content {
  flex-direction: column;
  justify-content: space-around;
}
</style>

<script>
import { Share } from "@capacitor/share";

export default {
  data() {
    return {
      interactions: [
        {
          name: "Likes",
          icon: "mdi-thumb-up-outline",
          // action: null,
          value: this.likes,
          disabled: true,
        },
        {
          name: "Dislikes",
          icon: "mdi-thumb-down-outline",
          // action: this.dislike(),
          actionName: "dislike",
          value: this.dislikes,
          disabled: true,
        },
        {
          name: "Share",
          icon: "mdi-share-outline",
          // action: this.share(),
          actionName: "share",
          disabled: false,
        },
      ],
      showMore: false,
      // share: false,
      title: null,
      uploaded: null,
      vidSrc: null,
      description: null,
      views: null,
      recommends: [],
      loaded: false,
    };
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      this.likes = 100;
      this.loaded = false;

      this.$youtube.getVid(this.$route.query.v).then((result) => {
        console.log("Video info data", result);
        console.log(result.availableResolutions);
        this.vidSrc =
          result.availableResolutions[result.availableResolutions.length - 1].url; // Takes the highest available resolution with both video and Audio. Note this will be lower than the actual highest resolution
        this.title = result.title;
        this.description = result.metadata.description; // While this works, I do recommend using the rendered description instead in the future as there are some things a pure string wouldn't work with
        this.views = result.metadata.viewCount.toLocaleString();
        this.likes = result.metadata.likes.toLocaleString();
        this.uploaded = result.metadata.uploadDate;
        this.interactions[0].value = result.metadata.likes;
        this.loaded = true;

        this.recommends = this.$youtube
          .viewRecommends(result.renderedData.recommendations)
          .filter((element) => {
            return element !== undefined;
          });
        // .catch((error) => this.$logger("Watch", error, true));
        console.log("recommendations:", this.recommends);
      });

      this.$youtube.getReturnYoutubeDislike(this.$route.query.v, (data) => {
        this.dislikes = data.dislikes.toLocaleString();
        this.interactions[1].value = data.dislikes.toLocaleString();
      });
    },
    callMethodByName(name) {
      // Helper function needed because of issues when directly calling method
      // using item.action in the v-for loop
      this[name]();
    },
    dislike() {},
    async share() {
      // this.share = !this.share;
      await Share.share({
        title: this.title,
        text: this.title,
        url: 'https://youtu.be/' + this.$route.query.v,
        dialogTitle: 'Share video',
      });
    }
  },
  watch: {
    // Watch for change in the route query string (in this case, ?v=xxxxxxxx to ?v=yyyyyyyy)
    // When change is detected, reset and run getVideo function again
    $route: {
      deep: true,
      handler(newRt, oldRt) {
        if (newRt.query.v != oldRt.query.v) {
          this.vidSrc = "";
          this.getVideo();
        }
      }
    }
  }
};
</script>
