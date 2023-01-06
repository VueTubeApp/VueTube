<template>
  <div class="background" id="watch-body">
    <div id="player-container">
      <!-- // TODO: move component to default.vue -->
      <!-- // TODO: pass sources through vuex instead of props -->
      <player
        v-if="sources.length > 0 && video.title && video.channelName"
        ref="player"
        :video="video"
        :sources="sources"
        :recommends="recommends"
      />
    </div>

    <div
      id="content-container"
      :class="{
        'overflow-y-auto': !showComments,
        'overflow-y-hidden': showComments,
      }"
    >
      <v-card v-if="loaded" class="background rounded-0" flat>
        <div
          v-ripple
          class="d-flex justify-space-between align-start px-4 pt-4"
          @click="showMore = !showMore"
        >
          <div class="d-flex flex-column">
            <v-card-title
              v-emoji
              class="pa-0 text-wrap"
              style="font-size: 0.95rem; line-height: 1.15rem"
              v-text="video.title"
            />
            <v-card-text
              style="font-size: 0.75rem"
              class="background--text pa-0"
              :class="
                $vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'
              "
            >
              <div>
                <template
                  v-for="text in video.metadata.contents.find(
                    (content) => content.slimVideoInformationRenderer
                  ).slimVideoInformationRenderer.collapsedSubtitle.runs"
                  >{{ text.text }}
                </template>
              </div>
            </v-card-text>
          </div>
          <v-icon v-if="showMore" class="ml-4">mdi-chevron-up</v-icon>
          <v-icon v-else class="ml-4">mdi-chevron-down</v-icon>
        </div>
        <div
          class="d-flex justify-space-around"
          :class="
            $store.state.tweaks.roundWatch && $store.state.tweaks.roundTweak > 0
              ? $vuetify.theme.dark
                ? 'background lighten-1'
                : 'background darken-1'
              : ''
          "
          :style="{
            borderRadius: $store.state.tweaks.roundWatch
              ? `${$store.state.tweaks.roundTweak / 2}rem`
              : '0',
            margin:
              $store.state.tweaks.roundWatch &&
              $store.state.tweaks.roundTweak > 0
                ? '1rem'
                : '0',
          }"
        >
          <v-btn
            v-for="(item, index) in interactions"
            :key="index"
            text
            fab
            class="vertical-button"
            elevation="0"
            style="
              width: 4.2rem !important;
              height: 4.2rem !important;
              text-transform: none !important;
            "
            :disabled="item.disabled"
            @click="callMethodByName(item.actionName)"
          >
            <v-icon v-text="item.icon" />
            <div
              class="mt-1"
              style="font-size: 0.6rem"
              v-text="item.value || item.name"
            />
          </v-btn>
          <!--   End Scrolling Div For Interactions   --->
          <!-- <hr /> -->
        </div>
        <!-- <v-bottom-sheet
          v-model="showMore"
          color="background"
          style="z-index: 9999999"
        >
          <v-sheet style="padding: 12px">
            <v-btn block @click="showMore = !showMore"
              ><v-icon>mdi-chevron-down</v-icon></v-btn
            ><br />

            <slim-video-description-renderer
              class="scroll-y"
              :render="video.renderedData.description"
            />
          </v-sheet>
        </v-bottom-sheet> -->

        <!-- <v-bottom-sheet v-model="share" color="background" style="z-index: 9999999">
          <v-sheet style="padding: 1em">
            <div class="scroll-y">
              {{ response.renderedData.description }}
            </div>
          </v-sheet>
        </v-bottom-sheet> -->
      </v-card>

      <v-divider
        v-if="
          !$store.state.tweaks.roundTweak || !$store.state.tweaks.roundWatch
        "
      />

      <!--   Channel Bar   -->
      <div v-if="loaded">
        <v-card
          flat
          class="channel-section py-2 px-3 background"
          :class="
            $store.state.tweaks.roundWatch && $store.state.tweaks.roundTweak > 0
              ? $vuetify.theme.dark
                ? 'background lighten-1'
                : 'background darken-1'
              : ''
          "
          to="/channel"
          :style="{
            borderRadius: $store.state.tweaks.roundWatch
              ? `${$store.state.tweaks.roundTweak / 2}rem`
              : '0',
            margin:
              $store.state.tweaks.roundWatch &&
              $store.state.tweaks.roundTweak > 0
                ? '1rem'
                : '0',
          }"
          @click="$store.dispatch('channel/fetchChannel', video.channelUrl)"
        >
          <div id="details">
            <div class="avatar-link mr-3">
              <v-img class="avatar-thumbnail" :src="video.channelImg" />
            </div>
            <div class="channel-byline" v-emoji>
              <div class="channel-name" v-text="video.channelName" />
              <div
                class="caption background--text"
                :class="
                  $vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'
                "
                v-text="video.channelSubs + ' subscribers'"
              />
            </div>
          </div>
          <div class="primary--text" style="text-transform: uppercase">
            subscribe
          </div>
        </v-card>
      </div>

      <v-divider
        v-if="
          !$store.state.tweaks.roundTweak || !$store.state.tweaks.roundWatch
        "
      />

      <!-- Description -->
      <div v-if="showMore">
        <div class="scroll-y ma-4 pt-1">
          <slim-video-description-renderer
            :render="video.renderedData.description"
          />
        </div>
      </div>

      <v-divider
        v-if="
          showMore &&
          (!$store.state.tweaks.roundTweak || !$store.state.tweaks.roundWatch)
        "
      />

      <!-- Comments -->
      <div v-if="loaded && video.commentData" @click="toggleComment">
        <v-card
          v-ripple
          flat
          tile
          class="comment-renderer px-3 background"
          :class="
            $store.state.tweaks.roundWatch && $store.state.tweaks.roundTweak > 0
              ? $vuetify.theme.dark
                ? 'background lighten-1'
                : 'background darken-1'
              : ''
          "
          :style="{
            borderRadius: $store.state.tweaks.roundWatch
              ? `${$store.state.tweaks.roundTweak / 2}rem !important`
              : '0',
            margin:
              $store.state.tweaks.roundWatch &&
              $store.state.tweaks.roundTweak > 0
                ? '1rem'
                : '0',
          }"
        >
          <v-card-text class="comment-count keep-spaces px-0">
            <template v-for="text in video.commentData.headerText.runs">
              <template v-if="text.bold">
                <strong :key="text.text">{{ text.text }}</strong>
              </template>
              <template v-else>{{ text.text }}</template>
            </template>
          </v-card-text>
          <v-icon v-if="showComments" dense>mdi-unfold-less-horizontal</v-icon>
          <v-icon v-else dense>mdi-unfold-more-horizontal</v-icon>
        </v-card>
      </div>

      <v-divider
        v-if="
          !$store.state.tweaks.roundTweak || !$store.state.tweaks.roundWatch
        "
      />

      <div
        v-if="loaded && video.commentData"
        :class="showComments ? 'comments-open' : ''"
        class="scroll-y comments"
      >
        <mainCommentRenderer
          v-model="showComments"
          :comment-data="video.commentData"
          :default-continuation="video.commentContinuation"
        ></mainCommentRenderer>
      </div>

      <!-- <swipeable-bottom-sheet
      :v-model="showComments"
      style="z-index: 9999999"
    ></swipeable-bottom-sheet> -->

      <!-- Related Videos -->
      <div v-if="!loaded">
        <v-skeleton-loader
          type="list-item-two-line, actions, divider, list-item-avatar, divider, list-item-three-line"
        />
        <vid-load-renderer :count="5" />
      </div>
      <item-section-renderer
        v-else
        :render="recommends"
        :style="{
          marginTop: $store.state.tweaks.roundTweak > 0 ? '1rem' : '0',
        }"
      />
    </div>
  </div>
</template>

<script>
import { Share } from "@capacitor/share";
import { getCpn } from "~/plugins/utils";
import player from "~/components/Player/index.vue";
import VidLoadRenderer from "~/components/vidLoadRenderer.vue";
import ItemSectionRenderer from "~/components/SectionRenderers/itemSectionRenderer.vue";
import mainCommentRenderer from "~/components/Comments/mainCommentRenderer.vue";
import SlimVideoDescriptionRenderer from "~/components/UtilRenderers/slimVideoDescriptionRenderer.vue";

import backType from "~/plugins/classes/backType";

export default {
  components: {
    player,
    VidLoadRenderer,
    ItemSectionRenderer,
    mainCommentRenderer,
    SlimVideoDescriptionRenderer,
  },
  layout: "empty",
  // transition(to) { // TODO: fix layout switching
  //   return to.name == "watch"
  //     ? { name: "slide-up", mode: "" }
  //     : { name: "slide-down", mode: "" };
  // },
  data: function () {
    return this.initializeState();
  },
  watch: {
    // Watch for change in the route query string (in this case, ?v=xxxxxxxx to ?v=yyyyyyyy)
    $route: {
      deep: true,
      handler(newRt, oldRt) {
        if (newRt.query.v && newRt.query.v != oldRt.query.v) {
          // Exit fullscreen if currently in fullscreen
          // if (this.$refs.player) this.$refs.player.webkitExitFullscreen();
          // Reset player and run getVideo function again
          // this.startTime = Math.floor(Date.now() / 1000);
          // this.getVideo();
          clearInterval(this.interval);
          Object.assign(this.$data, this.initializeState());
          this.mountedInit();
        }
      },
    },
  },

  mounted() {
    this.mountedInit();
    this.$vuetube.resetBackActions();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    getVideo() {
      this.loaded = false;

      this.$youtube.getVid(this.$route.query.v).then((result) => {
        // TODO: sourt "tiny" (no qualityLabel) as audio and rest as video
        this.sources = result.availableResolutionsAdaptive;
        console.log("Video info data", result);
        this.video = result;

        //---   Content Stuff   ---//
        // NOTE: extractor likes are broken, using RYD likes instead
        // this.likes = result.metadata.likes.toLocaleString();
        // this.interactions[0].value = result.metadata.likes.toLocaleString();
        this.loaded = true;
        this.recommends = result.renderedData.recommendations;
        console.log("recommendations:", this.recommends);

        //---   API WatchTime call   ---//
        if (this.$store.state.watchTelemetry) {
          this.playbackTracking = result.playbackTracking;
          this.st = 0;
          this.cpn = getCpn();
          this.initWatchTime().then(() => {
            this.sendWatchTime();
            this.interval = setInterval(this.sendWatchTime, 60000);
          });
        }
      });

      this.$youtube.getReturnYoutubeDislike(this.$route.query.v, (data) => {
        this.likes = data.likes.toLocaleString();
        this.dislikes = data.dislikes.toLocaleString();
        this.interactions[0].value = data.likes.toLocaleString();
        this.interactions[1].value = data.dislikes.toLocaleString();
      });
    },
    callMethodByName(name) {
      // Helper function needed because of issues when directly calling method
      // using item.action in the v-for loop
      this[name]();
    },
    async share() {
      // this.share = !this.share;
      await Share.share({
        title: this.video.title,
        text: this.video.title,
        url: "https://youtu.be/" + this.$route.query.v,
        dialogTitle: "Share video",
      });
    },
    sendWatchTime() {
      const player = this.$refs.player.getPlayer();
      const rt = Math.floor(Date.now() / 1000) - this.startTime;
      const params = {
        cpn: this.cpn,
        rt: rt,
        rti: rt,
        rtn: rt,
        cmt: player.currentTime,
        et: player.currentTime,
        st: this.st,
        state: player.paused ? "paused" : "playing",
        volume: 100,
        muted: 0,
        fmt: 396,
      };
      this.st = player.currentTime;
      this.$youtube.saveApiStats(
        params,
        this.playbackTracking.videostatsWatchtimeUrl.baseUrl
      );
    },

    async initWatchTime() {
      await this.$youtube.saveApiStats(
        {
          cpn: this.cpn,
          fmt: 243,
          rtn: Math.floor(Date.now() / 1000) - this.startTime,
          rt: Math.floor(Date.now() / 1000) - this.startTime,
          muted: 0,
        },
        this.playbackTracking.videostatsPlaybackUrl.baseUrl
      );
    },

    initializeState() {
      return {
        interactions: [
          {
            name: "Likes",
            icon: "mdi-thumb-up-outline",
            // action: this.like(),
            actionName: "like",
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
          {
            name: "Save",
            icon: "mdi-plus-box-multiple-outline",
            actionName: "enqueue",
            disabled: true,
          },
          // {
          //   name: "Quality",
          //   icon: "mdi-high-definition",
          //   actionName: "quality",
          //   disabled: false,
          // },
          // {
          //   name: "Speed",
          //   icon: "mdi-speedometer",
          //   actionName: "speed",
          //   disabled: false,
          // },
        ],
        showMore: false,
        showComments: false,
        // share: false,
        sources: [],
        recommends: null,
        loaded: false,
        interval: null,
        video: null,
        backHierarchy: [],
      };
    },

    mountedInit() {
      this.startTime = Math.floor(Date.now() / 1000);
      this.getVideo();

      //  Reset vertical scrolling
      const scrollableList = document.querySelectorAll(".overflow-y-auto");
      scrollableList.forEach((scrollable) => {
        scrollable.scrollTo(0, 0);
      });
    },

    // Toggle this.showComments to true or false. If it is true, then add the dismiss function to backStack.
    toggleComment() {
      document.getElementById("content-container").scrollTo(0, 0);
      this.showComments = !this.showComments;
      if (this.showComments) {
        const dismissComment = new backType(
          () => {
            this.showComments = false;
          },
          () => {
            return this.showComments;
          }
        );
        this.$vuetube.addBackAction(dismissComment);
      }
    },
  },
};
</script>

<style>
.comments {
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 2;
  height: 100%;
  max-height: 100%;
  position: absolute;
  pointer-events: none;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.comments-open {
  transform: translatey(0);
  pointer-events: auto;
  opacity: 1;
}
#watch-body {
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

#content-container {
  height: 100%;
  position: relative;
}

.vertical-button span.v-btn__content {
  flex-direction: column;
  justify-content: space-around;
}

.channel-section,
.comment-renderer {
  display: flex;
  align-items: center;
}

.channel-section #details,
.comment-renderer .comment-count {
  flex-grow: 1;
  display: flex;
  align-items: center;
  min-width: 0;
}

.channel-section .channel-byline {
  min-width: 0;
}

.channel-section .avatar-thumbnail {
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.channel-section .channel-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.keep-spaces {
  white-space: pre-wrap;
}

.v-card__title {
  word-break: break-word;
}
</style>
