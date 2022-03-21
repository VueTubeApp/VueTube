<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    <v-card class="ml-2 mr-2 flat light" flat>
      <v-card-title
        style="padding-top: 0; padding-bottom: 0; font-size: 0.95em"
        v-text="title"
      />
      <v-card-text>
        <div style="margin-bottom: 1em">{{ views }} views • {{ uploaded }}</div>

        <!--   Scrolling Div For Interactions   --->
        <div style="display: flex; margin-bottom: 1em">
          <v-list-item
            v-for="(item, index) in interactions"
            :key="index"
            style="padding: 0; flex: 0 0 20%"
          >
            <v-btn
              text
              @click="item.action"
              class="vertical-button"
              style="padding: 0; margin: 0"
              elevation="0"
              :disabled="item.disabled"
            >
              <v-icon v-text="item.icon" />
              <div v-text="item.value || item.name" />
            </v-btn>
          </v-list-item>

          <v-spacer />
          <v-btn text @click="showMore = !showMore">
            <v-icon v-if="showMore">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <!--   End Scrolling Div For Interactions   --->
        <hr />
        <p>Channel Stuff</p>
        <hr />
      </v-card-text>
      <div class="scroll-y ml-2 mr-2" v-if="showMore">
        {{ description }}
      </div>

      <v-bottom-sheet
        v-model="showMore"
        color="accent2"
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
      </v-bottom-sheet>
      <!-- <v-bottom-sheet v-model="share" color="accent2" style="z-index: 9999999">
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
export default {
  methods: {
    dislike() {},
    share() {
      this.share = !this.share;
    },
  },
  data() {
    return {
      interactions: [
        {
          name: "Likes",
          icon: "mdi-thumb-up",
          action: null,
          value: this.likes,
          disabled: true,
        },
        {
          name: "Dislikes",
          icon: "mdi-thumb-down",
          action: this.dislike(),
          value: this.dislikes,
          disabled: true,
        },
        {
          name: "Share",
          icon: "mdi-share",
          action: this.share(),
          disabled: true,
        },
      ],
      showMore: false,
      share: false,
      title: null,
      uploaded: null,
      vidSrc: null,
      description: null,
      views: null,
      recommends: [],
    };
  },
  mounted() {
    this.likes = 100;

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
};
</script>
