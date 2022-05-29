<template>
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
      class="background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      background-opacity="0.5"
      background-color="primary"
      :buffer-value="buffered"
      :value="percent"
      color="primary"
      height="2"
      :style="
        fullscreen
          ? 'width: calc(100% - 3rem); left: 1.5rem; position: absolute; bottom: 3.75rem;'
          : 'width: 100%'
      "
    />
    <!-- Scrubber -->
    <v-slider
      id="scrubber"
      hide-details
      height="2"
      dense
      track-color="transparent"
      :class="!controls && !fullscreen && !scrubbing ? 'invisible' : ''"
      style="position: absolute; z-index: 69420"
      :style="
        fullscreen
          ? 'width: calc(100% - 3rem); left: 1.5rem; bottom: 3.75rem;'
          : 'width: calc(100% - 0.8rem); left: 0.4rem; bottom: 0;'
      "
      :thumb-size="0"
      :max="duration"
      :value="progress"
      @start="(scrubbing = true), $emit('seeking')"
      @end="(scrubbing = false), $emit('seeking')"
      @change="scrub($event)"
      @input="scrubbing ? seek($event) : null"
    >
      <template #thumb-label="{ value }">
        <div style="transform: translateY(-50%)">
          <canvas
            ref="preview"
            class="white"
            :width="video.clientWidth / 3"
            :height="video.clientHeight / 3"
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
</template>

<script>
export default {
  props: ["sources", "video", "controls", "fullscreen"],

  data() {
    return {
      scrubbing: false,
      percent: 0,
      progress: 0,
      buffered: 0,
      duration: 0,
      vidSrc: "",
      vidWrs: "",
    };
  },
  mounted() {
    console.log("sources", this.sources);
    this.vidSrc = this.sources[this.sources.length - 1].url;
    this.vidWrs = this.sources[1].url;
    let vid = this.video;
    vid.addEventListener("loadeddata", (e) => {
      // console.log("%c loadeddata", "color: #00ff00");
      console.log(e);
      //Video should now be loaded but we can add a second check
      if (vid.readyState >= 3) {
        vid.ontimeupdate = () => {
          // console.log("%c timeupdate", "color: #aaaaff");
          this.duration = vid.duration;
          if (!this.scrubbing) this.progress = vid.currentTime;
          this.percent = (vid.currentTime / vid.duration) * 100;
        };
        vid.onprogress = () => {
          // console.log("%c progress", "color: #ff00ff");
          this.buffered = (vid.buffered.end(0) / vid.duration) * 100;
        };
      }
    });
  },
  methods: {
    // TODO: better scrubbing preview
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
    // TODO: scrubbing preview end
    seek(e) {
      // console.log(`scrubbing ${e}`);
      let vid = this.$refs.playerfake;
      let canvas = this.$refs.preview;
      this.$refs.playerfake.currentTime = e;
      canvas
        .getContext("2d")
        .drawImage(
          vid,
          0,
          0,
          this.video.clientWidth / 3,
          this.video.clientHeight / 3
        );
    },
    scrub(e) {
      this.video.currentTime = e;
    },
  },
};
</script>
