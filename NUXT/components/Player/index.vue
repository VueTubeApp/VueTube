<template>
  <div
    ref="vidcontainer"
    v-touch="{
      down: () => ($refs.player.styles.width = '50% !important'),
      up: () => ($refs.player.styles['object-fit'] = 'contain !important'),
    }"
    class="d-flex flex-column"
    style="position: relative"
    :style="{
      borderRadius: $store.state.tweaks.roundWatch
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
    @click="controls = !controls"
  >
    <video
      ref="player"
      autoplay
      width="100%"
      :src="vidSrc"
      style="transition: filter 0.15s ease-in-out; max-height: 100vh"
      :style="
        controls
          ? 'filter: brightness(50%); object-fit: contain'
          : 'filter: none; object-fit: cover'
      "
    />
    <!-- @webkitfullscreenchange="handleFullscreenChange" -->

    <v-btn
      text
      tile
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        opacity: 0;
      "
      @doubleclick.stop="$refs.player.currentTime -= $refs.player.duration / 10"
    >
      <v-icon>mdi-rewind</v-icon>
    </v-btn>

    <v-btn
      text
      tile
      style="
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        opacity: 0;
      "
      @doubleclick.stop="$refs.player.currentTime += $refs.player.duration / 10"
    >
      <v-icon>mdi-fast-forward</v-icon>
    </v-btn>

    <div
      style="transition: opacity 0.15s ease-in-out"
      :style="controls ? 'opacity: 1;' : 'opacity: 0; pointer-events: none'"
    >
      <v-btn fab text style="position: absolute; top: 0; left: 0">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn fab text style="position: absolute; top: 0; right: 7rem">
        <v-icon>mdi-sync</v-icon>
      </v-btn>
      <v-btn fab text style="position: absolute; top: 0; right: 3.5rem">
        <v-icon>mdi-closed-caption-outline</v-icon>
      </v-btn>
      <v-btn fab text style="position: absolute; top: 0; right: 0">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-btn
        v-if="$refs.player"
        fab
        text
        style="
          height: 5rem;
          width: 5rem;
          position: absolute;
          top: calc(50% - 2.5rem);
          left: calc(50% - 2.5rem);
        "
        color="white"
        @click.stop="
          $refs.player.paused
            ? ($refs.player.play(), (controls = false))
            : $refs.player.pause()
        "
      >
        <v-icon
          ref="pausePlayIndicator"
          size="5rem"
          v-text="$refs.player.paused ? 'mdi-play' : 'mdi-pause'"
        />
      </v-btn>

      <div
        v-if="$refs.player"
        style="position: absolute; bottom: 1.25rem; left: 1.25rem"
      >
        {{ watched }}
        <span style="color: #999"> / {{ total }} </span>
      </div>
      <!-- <v-btn fab text style="position: absolute; bottom: 0.25rem; right: 7rem">
        1X
      </v-btn>
      <v-btn fab text style="position: absolute; bottom: 0.25rem; right: 3rem">
        HD
      </v-btn> -->
      <v-btn
        fab
        text
        style="position: absolute; bottom: 0.25rem; right: 0"
        @click.stop="(controls = $refs.player.paused), handleFullscreenChange()"
      >
        <v-icon>{{
          isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }}</v-icon>
      </v-btn>
    </div>
    <div>
      <video
        ref="playerfake"
        muted
        autoplay
        style="display: none"
        :src="vidWrs"
      />
      <v-progress-linear
        query
        active
        style="width: 100%"
        background-opacity="0.5"
        background-color="primary"
        :buffer-value="buffered"
        :value="percent"
        color="primary"
        height="2"
      />
      <!-- Scrubber -->
      <v-slider
        v-if="$refs.player"
        hide-details
        height="2"
        dense
        style="
          position: absolute;
          z-index: 69420;
          width: 100%;
          bottom: 0;
          left: 0;
        "
        :thumb-size="0"
        :max="duration"
        :value="progress"
        @start="scrubbing = true"
        @end="scrubbing = false"
        @change="scrub($event)"
        @input="seek($event)"
      >
        <!-- :thumb-size="$refs.player.clientHeight / 3" -->
        <template #thumb-label="{ value }">
          <div style="transform: translateY(-50%)">
            <canvas
              ref="preview"
              class="white"
              :width="$refs.player.clientWidth / 3"
              :height="$refs.player.clientHeight / 3"
              style="border: 2px solid white"
              :style="{
                borderRadius: $store.state.tweaks.roundWatch
                  ? `${$store.state.tweaks.roundTweak / 3}rem`
                  : '0',
              }"
            ></canvas>
            <div class="text-center pb-4" style="font-size: 0.8rem">
              <b>{{ $vuetube.humanTime(value) }}</b>
            </div>
          </div>
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script>
import seekbar from "~/components/Player/seekbar.vue";
import controls from "~/components/Player/controls.vue";

export default {
  components: {
    seekbar,
    controls,
  },
  props: ["sources"],
  data() {
    return {
      isFullscreen: false,
      scrubbing: false,
      controls: false,
      percent: 0,
      progress: 0,
      buffered: 0,
      duration: 0,
      watched: 0,
      total: 0,
      vidSrc: "",
      vidWrs: "",
    };
  },
  mounted() {
    console.log("sources", this.sources);
    this.vidSrc = this.sources[this.sources.length - 1].url;
    this.vidWrs = this.sources[1].url;
    let vid = this.$refs.player;
    vid.addEventListener("loadeddata", (e) => {
      console.log("%c loadeddata", "color: #00ff00");
      console.log(e);
      //Video should now be loaded but we can add a second check
      if (vid.readyState >= 3) {
        vid.ontimeupdate = () => {
          console.log("%c timeupdate", "color: #aaaaff");
          this.duration = vid.duration;
          if (!this.scrubbing) this.progress = vid.currentTime;
          this.percent = (vid.currentTime / vid.duration) * 100;
          this.watched = this.$vuetube.humanTime(vid.currentTime);
          this.total = this.$vuetube.humanTime(vid.duration);
        };
        vid.onprogress = () => {
          console.log("%c progress", "color: #ff00ff");
          this.buffered = (vid.buffered.end(0) / vid.duration) * 100;
        };
      }
    });
  },
  methods: {
    loadVideoFrames() {
      // Exit loop if desired number of frames have been extracted
      if (this.frames.length >= frameCount) {
        this.visibleFrame = 0;

        // Append all canvases to container div
        this.frames.forEach((frame) => {
          this.frameContainerElement.appendChild(frame);
        });
        return;
      }

      // If extraction hasn’t started, set desired time for first frame
      if (this.frames.length === 0) {
        this.requestedTime = 0;
      } else {
        this.requestedTime = this.requestedTime + this.frameTimestep;
      }

      // Send seek request to video player for the next frame.
      this.videoElement.currentTime = this.requestedTime;
    },
    extractFrame(videoWidth, videoHeight) {
      // Create DOM canvas object
      var canvas = document.createElement("canvas");
      canvas.className = "video-scrubber-frame";
      canvas.height = videoHeight;
      canvas.width = videoWidth;

      // Copy current frame to canvas
      var context = canvas.getContext("2d");
      context.drawImage(this.videoElement, 0, 0, videoWidth, videoHeight);
      this.frames.push(canvas);

      //  Load the next frame
      loadVideoFrames();
    },
    prefetch_file(url, fetched_callback, progress_callback, error_callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";

      xhr.addEventListener(
        "load",
        function () {
          if (xhr.status === 200) {
            var URL = window.URL || window.webkitURL;
            var blob_url = URL.createObjectURL(xhr.response);
            fetched_callback(blob_url);
          } else {
            error_callback();
          }
        },
        false
      );

      var prev_pc = 0;
      xhr.addEventListener("progress", function (event) {
        if (event.lengthComputable) {
          var pc = Math.round((event.loaded / event.total) * 100);
          if (pc != prev_pc) {
            prev_pc = pc;
            progress_callback(pc);
          }
        }
      });
      xhr.send();
    },
    async extractFramesFromVideo(videoUrl, fps = 25) {
      // fully download it first (no buffering):
      console.log(videoUrl);
      console.log(fps);
      let videoBlob = await fetch(videoUrl, {
        headers: { range: "bytes=0-567139" },
      }).then((r) => r.blob());
      console.log(videoBlob);
      let videoObjectUrl = URL.createObjectURL(videoBlob);
      let video = document.createElement("video");

      let seekResolve;
      video.addEventListener("seeked", async function () {
        if (seekResolve) seekResolve();
      });

      video.src = videoObjectUrl;

      // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
      while (
        (video.duration === Infinity || isNaN(video.duration)) &&
        video.readyState < 2
      ) {
        await new Promise((r) => setTimeout(r, 1000));
        video.currentTime = 10000000 * Math.random();
      }
      let duration = video.duration;

      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let [w, h] = [video.videoWidth, video.videoHeight];
      canvas.width = w;
      canvas.height = h;

      let interval = 1;
      let currentTime = 0;

      while (currentTime < duration) {
        video.currentTime = currentTime;
        await new Promise((r) => (seekResolve = r));

        context.drawImage(video, 0, 0, w, h);
        let base64ImageData = canvas.toDataURL();
        console.log(base64ImageData);
        this.frames.push(base64ImageData);

        currentTime += interval;
      }
      console.log("%c frames", "color: #00ff00");
      console.log(this.frames);
    },
    seek(e) {
      console.log(`scrubbing ${e}`);
      let vid = this.$refs.playerfake;
      let canvas = this.$refs.preview;
      this.$refs.playerfake.currentTime = e;
      canvas
        .getContext("2d")
        .drawImage(
          vid,
          0,
          0,
          this.$refs.player.clientWidth / 3,
          this.$refs.player.clientHeight / 3
        );
    },
    scrub(e) {
      this.$refs.player.currentTime = e;
    },
    handleFullscreenChange() {
      console.log(this.$refs.player);
      console.log(document.fullscreenElement);
      if (document?.fullscreenElement === this.$refs.vidcontainer) {
        // const cancellFullScreen =
        //   document.exitFullscreen ||
        //   document.mozCancelFullScreen ||
        //   document.webkitExitFullscreen ||
        //   document.msExitFullscreen;
        // cancellFullScreen.call(document);
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.isFullscreen = false;
        this.$vuetube.statusBar.show();
        this.$vuetube.navigationBar.show();
      } else {
        // const element = document;
        // const requestFullScreen =
        //   element.requestFullscreen ||
        //   element.webkitRequestFullScreen ||
        //   element.mozRequestFullScreen ||
        //   element.msRequestFullScreen;
        // requestFullScreen.call(element);
        this.$refs.vidcontainer.requestFullscreen({
          requireOrientation: "landscape",
        });
        this.isFullscreen = true;
        this.$vuetube.statusBar.hide();
        this.$vuetube.navigationBar.hide();
      }
      // screen.orientation
      //   .lock("landscape")
      //   .then(function () {
      //     console.log("Locked");
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    getPlayer() {
      return this.$refs.player;
    },
  },
};
</script>
