<template>
  <!-- // TODO: down: () => minimize, -->
  <div
    ref="vidcontainer"
    class="d-flex flex-column black"
    style="position: relative"
    :style="{
      height: isFullscreen ? '100vh' : 'auto',
      maxHeight: isFullscreen ? '' : '50vh',
      borderRadius:
        $store.state.tweaks.roundWatch && !isFullscreen
          ? `${$store.state.tweaks.roundTweak / 3}rem ${
              $store.state.tweaks.roundTweak / 3
            }rem 0rem 0rem !important`
          : '0',
    }"
  >
    <video
      ref="player"
      v-touch="{
        up: () => {
          if (!isFullscreen) fullscreenHandler(true);
          else if (verticalFullscreen) shortNext();
        },
        down: () => {
          if (isFullscreen) fullscreenHandler(true);
        },
      }"
      mediagroup="vuetubecute"
      autoplay
      width="100%"
      :src="vidSrc"
      :height="isFullscreen ? '100%' : 'auto'"
      style="transition: filter 0.15s ease-in-out, transform 0.15s linear"
      :class="
        controls ||
        seeking ||
        skipping ||
        ($store.state.player.preload && buffered < 100)
          ? verticalFullscreen &&
            !($store.state.player.preload && buffered < 100)
            ? 'dim-ish'
            : 'dim'
          : ''
      "
      :style="{
        transform: shortTransition ? 'translateY(-100%)' : '',
        objectFit: contain ? 'contain' : 'cover',
        maxHeight: isFullscreen ? '' : '50vh',
        borderRadius:
          $store.state.tweaks.roundWatch && !isFullscreen
            ? `${$store.state.tweaks.roundTweak / 3}rem ${
                $store.state.tweaks.roundTweak / 3
              }rem 0rem 0rem !important`
            : '0',
      }"
      :poster="$youtube.getThumbnail($route.query.v, 'max', [])"
      @loadedmetadata="checkDimensions()"
      @click="controlsHandler()"
    />
    <audio ref="audio" mediagroup="vuetubecute" :src="audSrc" />

    <!-- // TODO: merge the bottom 2 into 1 reusable component -->
    <v-btn
      v-touch="{
        up: () => {
          if (!isFullscreen) fullscreenHandler(true);
          else if (verticalFullscreen) shortNext();
        },
        down: () => {
          if (isFullscreen) fullscreenHandler(true);
        },
        right: () => (contain = true),
        left: () => (contain = false),
      }"
      text
      tile
      color="white"
      :class="skipping == -10 ? '' : 'invisible'"
      style="
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        position: absolute;
        transition: opacity 0.15s;
        border-radius: 0 100vh 100vh 0;
        text-transform: none;
        font-size: 0.5rem;
      "
      @click="controlsHandler()"
      @dblclick="skipHandler(-10)"
    >
      <v-icon>mdi-rewind</v-icon>
      <!-- {{ skipping }} seconds -->
    </v-btn>

    <v-btn
      v-touch="{
        up: () => {
          if (!isFullscreen) fullscreenHandler(true);
          else if (verticalFullscreen) shortNext();
        },
        down: () => {
          if (isFullscreen) fullscreenHandler(true);
        },
        right: () => (contain = false),
        left: () => (contain = true),
      }"
      text
      tile
      color="white"
      :class="skipping == 10 ? '' : 'invisible'"
      style="
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        position: absolute;
        transition: opacity 0.15s;
        border-radius: 100vh 0 0 100vh;
        text-transform: none;
        font-size: 0.5rem;
      "
      @click="controlsHandler()"
      @dblclick="skipHandler(10)"
    >
      <v-icon>mdi-fast-forward</v-icon>
      <!-- {{ skipping }} seconds] -->
    </v-btn>

    <div
      v-if="seeking"
      class="d-flex justify-center"
      style="width: 100%; top: 0.5rem; position: absolute; font-size: 0.66rem"
    >
      <v-icon small class="pr-2">mdi-rewind</v-icon>
      Double tap left or right to skip 10 seconds
      <v-icon small class="pl-2">mdi-fast-forward</v-icon>
    </div>

    <!-- controls container -->
    <div
      v-if="$refs.player && $refs.player.currentSrc"
      style="transition: opacity 0.15s ease-in-out"
      :style="
        controls && !seeking
          ? 'opacity: 1;'
          : 'opacity: 0; pointer-events: none'
      "
    >
      <!-- top controls row -->
      <div
        style="position: absolute; width: 100%; top: 0.25rem"
        class="d-flex justify-center px-2"
      >
        <minimize />
        <div v-if="isFullscreen" class="pt-2" @click.self="controlsHandler()">
          <h4>{{ video.title }}</h4>
          <div style="color: #aaa; font-size: 0.75rem">
            {{ video.channelName }}
          </div>
        </div>
        <v-spacer />
        <captions />
        <loop
          v-if="$refs.player"
          class="mx-2"
          :loop="$refs.player.loop"
          @loop="
            ($refs.player.loop = !$refs.player.loop),
              ($refs.audio.loop = !$refs.audio.loop),
              $store.commit('player/setLoop', $event)
          "
        />
        <close />
      </div>
      <!-- top controls row end -->

      <!-- center controls row -->
      <div
        class="d-flex justify-center align-center"
        style="
          transform: translate(-50%, -50%);
          position: absolute;
          left: 50%;
          top: 50%;
        "
      >
        <v-btn
          v-if="!verticalFullscreen"
          fab
          text
          color="white"
          class="mx-12"
          disabled
        >
          <v-icon size="2rem" color="white">mdi-skip-previous</v-icon>
        </v-btn>
        <playpause
          v-if="$refs.player"
          :video="$refs.player"
          :buffering="bufferingDetected"
          @play="$refs.player.play(), $refs.audio.play()"
          @pause="pauseHandler"
        />
        <v-btn
          v-if="!verticalFullscreen"
          fab
          text
          color="white"
          class="mx-12"
          @click="
            $router.push(
              `/watch?v=${recommends.contents[0].videoWithContextRenderer.videoId}`
            )
          "
        >
          <v-icon size="2rem" color="white">mdi-skip-next</v-icon>
        </v-btn>
      </div>
      <!-- center controls row end -->

      <!-- time & fullscreen row -->
      <div
        :style="isFullscreen ? 'bottom: 4.25rem' : 'bottom: 0.5rem'"
        class="d-flex justify-between align-center pl-4 pr-2"
        style="position: absolute; width: 100%"
        @click.self="controlsHandler()"
      >
        <watchtime
          v-if="$refs.player"
          :current-time="$refs.player.currentTime"
          :duration="$refs.player.duration"
          :controls="controls"
        />
        <v-spacer />
        <fullscreen
          style="z-index: 2"
          :fullscreen="isFullscreen"
          @fullscreen="fullscreenHandler(true)"
        />
      </div>
      <!-- time & fullscreen row end -->

      <!-- bottom controls row -->
      <div
        style="position: absolute; width: 100%; bottom: 0.5rem"
        class="d-flex justify-between align-center px-2"
        @click.self="controlsHandler()"
      >
        <fscontrols
          :is-fullscreen="isFullscreen"
          :vertical-fullscreen="verticalFullscreen"
        />
        <v-spacer />
        <!-- // TODO: merge the bottom 2 into 1 reusable component -->
        <quality
          v-if="$refs.player && $refs.player.currentSrc"
          :sources="sources"
          :current-source="$refs.player"
          @quality="qualityHandler($event)"
        />
        <speed
          v-if="$refs.player"
          class="mx-2"
          :current-speed="$refs.player.playbackRate"
          @speed="
            ($refs.player.playbackRate = $event),
              ($refs.audio.playbackRate = $event),
              $store.state.player.speedAutosave
                ? $store.commit('player/setSpeed', $event)
                : {}
          "
        />
        <v-btn v-if="isFullscreen" fab text small disabled @click.stop="">
          <v-icon>mdi-cards-outline</v-icon>
        </v-btn>
        <!-- placeholder for moving fullscreen button above -->
        <v-btn v-else fab text small disabled> </v-btn>
      </div>
      <!-- bottom controls row -->
    </div>
    <!-- controls container end -->

    <progressbar
      v-if="$refs.player"
      :current-time="$refs.player.currentTime"
      :duration="$refs.player.duration"
      :fullscreen="isFullscreen"
      :controls="controls"
      :buffered="buffered"
      :seeking="seeking"
    />

    <sponsorblock
      v-if="$refs.player && blocks.length > 0"
      :duration="$refs.player.duration"
      :fullscreen="isFullscreen"
      :controls="controls"
      :seeking="seeking"
      :blocks="blocks"
    />

    <seekbar
      v-if="$refs.player"
      v-show="!isFullscreen || controls"
      :duration="$refs.player.duration"
      :fullscreen="isFullscreen"
      :current-time="progress"
      :video="$refs.player"
      :controls="controls"
      :sources="sources"
      :seeking="seeking"
      @seeking="seeking = !seeking"
      @scrub="
        ($refs.player.currentTime = $event), ($refs.audio.currentTime = $event)
      "
    />

    <v-progress-circular
      v-if="$store.state.player.preload && buffered < 100"
      style="
        transform: translate(-50%, -50%);
        position: absolute;
        left: 50%;
        top: 50%;
      "
      color="primary"
      :value="buffered"
      :rotate="-90"
      :size="64"
    >
      <b>{{ buffered }}%</b>
    </v-progress-circular>
  </div>
</template>

<script>
import loop from "~/components/Player/loop.vue";
import close from "~/components/Player/close.vue";
import speed from "~/components/Player/speed.vue";
import seekbar from "~/components/Player/seekbar.vue";
import quality from "~/components/Player/quality.vue";
import minimize from "~/components/Player/minimize.vue";
import captions from "~/components/Player/captions.vue";
import playpause from "~/components/Player/playpause.vue";
import watchtime from "~/components/Player/watchtime.vue";
import fscontrols from "~/components/Player/fscontrols.vue";
import fullscreen from "~/components/Player/fullscreen.vue";
import progressbar from "~/components/Player/progressbar.vue";
import sponsorblock from "~/components/Player/sponsorblock.vue";

import backType from "~/plugins/classes/backType";

export default {
  components: {
    sponsorblock,
    progressbar,
    fullscreen,
    fscontrols,
    watchtime,
    playpause,
    captions,
    minimize,
    quality,
    seekbar,
    speed,
    close,
    loop,
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
    sources: {
      type: Array,
      required: true,
    },
    recommends: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isFullscreen: false,
      fullscreenLock: false,
      shortTransition: false,
      verticalFullscreen: false,
      midRotation: false,
      controls: false,
      seeking: false,
      contain: true,
      skipping: 0,
      progress: 0,
      buffered: 0,
      watched: 0,
      blocks: [],
      vidSrc: "",
      audSrc: "",
      isVerticalVideo: false, // maybe rename(refactor everywhere used) to isShort
      bufferingDetected: false,
      isMusic: false,
      vid: null,
    };
  },
  mounted() {
    console.log("sources", this.sources);
    console.log("recommends", this.recommends);
    this.vid = this.$refs.player;

    // TODO: this.$store.state.player.quality, check if exists and select the closest one
    if (this.$store.state.player.preload) this.prebuffer(this.sources[5].url);
    else {
      this.audSrc = this.sources[this.sources.length - 1].url;
      this.vidSrc = this.sources[5].url;
    }

    this.$youtube.getSponsorBlock(this.video.id, (data) => {
      // console.warn("sbreturn", data);
      if (Array.isArray(data)) {
        this.blocks = data;
        data.find((block) => {
          if (block.category === "music_offtopic") {
            this.isMusic = true;
            this.$refs.audio.playbackRate = 1;
            this.$refs.player.playbackRate = 1;
          }
        });
      }
    });

    // TODO: detect this.isMusic from the video or channel metadata instead of just SB segments

    this.$refs.player.addEventListener("loadeddata", this.loadedDataEvent);
  },
  created() {
    screen.orientation.addEventListener("change", () =>
      this.fullscreenHandler(false)
    );
  },
  beforeDestroy() {
    this.cleanup();
  },
  methods: {
    loadedDataEvent() {
      // console.log(e);
      // if (vid.networkState === vid.NETWORK_LOADING) {
      //   // The user agent is actively trying to download data.
      // }

      // if (vid.readyState < vid.HAVE_FUTURE_DATA) {
      //   // There is not enough data to keep playing from this point
      // }
      if (this.vid.readyState >= 3) {
        this.$refs.audio.play();
        this.bufferingDetected = false;
        this.$refs.audio.currentTime = this.vid.currentTime;

        if (!this.isMusic) {
          this.$refs.audio.playbackRate = this.$store.state.player.speed;
          this.$refs.player.playbackRate = this.$store.state.player.speed;
        } else {
          this.$refs.audio.playbackRate = 1;
          this.$refs.player.playbackRate = 1;
        }

        this.$refs.player.loop = this.$store.state.player.loop;
        this.$refs.audio.loop = this.$store.state.player.loop;
        this.$refs.player.addEventListener("timeupdate", this.timeUpdateEvent);
        // TODO: handle video ending with a "replay" button instead of <playpause /> if not on loop
        // TODO: split buffering into multiple sections as it should be for back/forth scrubbing
        this.$refs.player.addEventListener("progress", this.progressEvent);
        this.$refs.player.addEventListener("waiting", this.waitingEvent);
        this.$refs.player.addEventListener("playing", this.playingEvent);
      }
    },
    timeUpdateEvent() {
      if (!this.seeking) this.progress = this.vid.currentTime; // for seekbar

      // console.log("sb check", this.blocks);
      // iterate over data.segments array
      // for sponsorblock
      if (this.blocks.length > 0)
        this.blocks.forEach((sponsor) => {
          let vidTime = this.vid.currentTime;

          if (vidTime >= sponsor.segment[0] && vidTime <= sponsor.segment[1]) {
            console.log("Skipping the sponsor");
            this.$youtube.showToast("Skipped sponsor");
            this.$refs.player.currentTime = sponsor.segment[1] + 1;
            this.$refs.audio.currentTime = this.$refs.player.currentTime;
          }
        });
    },
    progressEvent() {
      if (this.bufferingDetected) {
        this.$refs.audio.currentTime = this.vid.currentTime;
        clearTimeout(this.bufferingDetected);
        this.bufferingDetected = false;
      }
      if (this.$refs.audio.paused && !this.$refs.player.paused)
        this.$refs.audio.play();
      this.buffered = (this.vid.buffered.end(0) / this.vid.duration) * 100;
    },
    waitingEvent() {
      // buffering detection & sync
      let threshold = 250; //ms after which user perceives buffering
      if (!this.$refs.player.paused) {
        this.bufferingDetected = setTimeout(() => {
          this.bufferingDetected = true;
          this.$refs.audio.pause();
          //show buffering
        }, threshold);
      }
    },
    playingEvent() {
      if (this.bufferingDetected != false) {
        clearTimeout(this.bufferingDetected);
        this.$refs.audio.currentTime = this.vid.currentTime;
        this.bufferingDetected = false;
        this.$refs.audio.play();
      }
    },
    cleanup() {
      if (this.xhr) this.xhr.abort();
      if (this.isFullscreen) this.exitFullscreen();
      if (this.bufferingDetected) clearTimeout(this.bufferingDetected);
      screen.orientation.removeEventListener("change");
      this.$refs.player.removeEventListener("loadeddata", this.loadedDataEvent);
      this.$refs.player.removeEventListener("timeupdate", this.timeUpdateEvent);
      this.$refs.player.removeEventListener("progress", this.progressEvent);
      this.$refs.player.removeEventListener("waiting", this.waitingEvent);
      this.$refs.player.removeEventListener("playing", this.playingEvent);
    },
    prebuffer(url) {
      this.xhr = new XMLHttpRequest();
      this.xhr.open("GET", url, true);
      this.xhr.responseType = "blob";

      this.xhr.addEventListener(
        "load",
        () => {
          if (this.xhr.status === 200) {
            var blob = this.xhr.response;
            console.error(this.xhr);
            this.blobToDataURL(blob, (dataurl) => {
              console.log(dataurl);
              this.vidSrc = dataurl;
              this.buffered = 100;
            });
          } else {
            console.error("errorred pre-fetch", this.xhr.status);
          }
        },
        false
      );

      var prev_pc = 0;
      this.xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          var pc = Math.round((event.loaded / event.total) * 100);
          if (pc != prev_pc) {
            prev_pc = pc; // ##%
            if (pc < 100) this.buffered = pc;
            // console.warn(this.xhr);
          }
        }
      });

      this.xhr.send();
    },
    // !NOTE: (BUG) too big to process for 1080p vids over 2 minutes
    blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function (e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
    },
    shortNext() {
      this.shortTransition = true;
      setTimeout(() => {
        this.$router.push(
          `/watch?v=${this.recommends.contents[0].videoWithContextRenderer.videoId}`
        );
      }, 150);
    },
    // TODO: make accumulative onclick after first dblclick (don't set timeout untill stopped clicking)
    skipHandler(time) {
      this.skipping = time;
      setTimeout(() => {
        this.skipping = false;
      }, 500);

      this.$refs.player.currentTime += time;
      this.$refs.audio.currentTime += time;
    },
    controlsHandler() {
      if (!this.seeking)
        this.controls
          ? (clearTimeout(this.controls), (this.controls = false))
          : setTimeout(() => {
              if (!this.skipping) {
                this.controls = setTimeout(() => {
                  if (!this.seeking && !this.$refs.player.paused)
                    this.controls = false;
                }, 2345);
              }
            }, 250);
    },
    qualityHandler(q) {
      console.log(q);
      let time = this.$refs.player.currentTime;
      let speed = this.$refs.player.playbackRate;
      this.$refs.player.src = q;
      this.$refs.audio.currentTime = time;
      this.$refs.player.currentTime = time;
      this.$refs.player.playbackRate = speed;
      this.$refs.audio.playbackRate = speed;
    },
    checkDimensions() {
      if (this.$refs.player.videoHeight > this.$refs.player.videoWidth) {
        this.isVerticalVideo = true;
        this.fullscreenHandler(true);
        this.controlsHandler();
      } else {
        this.isVerticalVideo = false;
      }
    },
    fullscreenHandler(pressedFullscreenBtn) {
      // Prevent fullscreen button press from being handled twice
      // (once by pressing fullscreen button, another by the resulting rotation)
      if (this.midRotation) {
        this.midRotation = false;
        return;
      }
      // Toggle fullscreen state
      if (this.isFullscreen) {
        this.exitFullscreen(pressedFullscreenBtn);
      } else {
        this.enterFullscreen(pressedFullscreenBtn);
      }
    },
    exitFullscreen(unlock) {
      if (unlock) {
        if (this.verticalFullscreen) {
          // Unset vertical fullscreen mode
          screen.orientation.unlock();
          this.fullscreenLock = false;
          this.verticalFullscreen = false;
        } else {
          // Unset standard fullscreen mode
          this.midRotation = true;
          screen.orientation.lock("portrait");
          this.fullscreenLock = true;
          // Locks the rotation to portrait for two seconds,
          // and will then rotate back to landscape if the
          // user doesn't rotate first
          setTimeout(() => {
            this.fullscreenLock = false;
            screen.orientation.unlock();
          }, 2 * 1000);
        }
      }
      this.$vuetube.navigationBar.show();
      this.$vuetube.statusBar.show();
      this.isFullscreen = false;
    },
    enterFullscreen(force) {
      if (force) {
        this.fullscreenLock = true;
        if (this.isVerticalVideo) {
          // Vertical fullscreen mode (vertical video only)
          screen.orientation.lock("portrait");
          this.verticalFullscreen = true;
        } else {
          // Standard fullscreen mode
          this.midRotation = true;
          screen.orientation.lock("landscape");
        }
      }
      this.$vuetube.navigationBar.hide();
      this.$vuetube.statusBar.hide();
      this.isFullscreen = true;

      //---   Fix pressing back button in fullscreen exiting the watch page   ---//
      this.$vuetube.addBackAction(
        new backType(
          () => {
            this.exitFullscreen(true);
          },
          () => {
            return this.isFullscreen;
          }
        )
      );
    },
    getPlayer() {
      return this.$refs.player;
    },
    pauseHandler() {
      this.$refs.player.pause();
      this.$refs.audio.pause();
      clearTimeout(this.bufferingDetected);
      this.bufferingDetected = false;
    },
  },
};
</script>

<style>
.dim {
  filter: brightness(33%);
}
.dim-ish {
  filter: brightness(66%);
}
.invisible {
  opacity: 0;
}
</style>
