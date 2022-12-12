<template>
  <div style="padding: 2rem; padding-bottom: 4rem">
    <v-icon x-large color="primary" style="padding-bottom: 0.25rem">
      mdi-cellphone-arrow-down
    </v-icon>

    <div v-if="status == 'checking'">
      <h1>{{ lang.checking }}</h1>
      <div>
        {{ lang.installed }}:
        {{ installedVersion.substring(0, 7) || "Unknown" }}
        ({{ installedChannel }})
      </div>
      <center>
        <v-progress-circular
          indeterminate
          style="padding-top: 10em"
          color="primary"
          size="75"
        />
      </center>
    </div>

    <div v-if="status == 'latest'">
      <h1>{{ lang.noupdate }}</h1>
      <p>{{ lang.noupdatemessage }}</p>
      <div class="bottom">
        <v-btn rounded @click="getLatest">{{ lang.refresh }}</v-btn>
        <v-btn
          rounded
          depressed
          color="primary"
          class="background--text"
          @click="$router.go(-1)"
        >
          {{ lang.okay }}
        </v-btn>
      </div>
    </div>

    <div v-if="status == 'available'">
      <h1 v-if="!downloading">{{ lang.available }}</h1>
      <h1 v-if="downloading">{{ lang.updating }}</h1>
      <div>
        {{ lang.installed }}:
        {{ installedVersion.substring(0, 7) || "Unknown" }}
        ({{ installedChannel }})
      </div>
      <div>{{ lang.latest }}: {{ latestVersion.tag_name }}</div>

      <div
        style="margin-top: 1em"
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        <div>
          {{ lang.published }}:
          {{ new Date(update.created_at).toLocaleString() }}
        </div>
        <div>
          {{ lang.size }}:
          {{ require("~/plugins/utils").humanFileSize(update.size) }}
        </div>
        <div>{{ lang.users }}: {{ update.download_count }}</div>
      </div>

      <div
        style="margin-top: 1em"
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        <b>Changelog</b>
      </div>
      <p
        style="white-space: pre-line"
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        {{ latestVersion.body.trim() }}
      </p>

      <v-progress-linear
        v-if="downloading"
        style="position: absolute; top: 0; width: 100%; left: 0"
        color="primary"
        indeterminate
      />

      <div v-if="!downloading" class="bottom">
        <v-btn
          rounded
          depressed
          :class="
            $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
          "
          @click="$router.go(-1)"
        >
          {{ lang.later }}
        </v-btn>
        <v-btn
          rounded
          depressed
          class="background--text ml-2"
          color="primary"
          @click="install()"
        >
          {{ lang.update }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Device } from "@capacitor/device";

export default {
  layout: "empty",
  data() {
    return {
      installedVersion: process.env.version,
      installedChannel: process.env.channel,
      latestVersion: "",
      lang: {},
      status: "checking",
      update: {},
      downloading: false,
    };
  },
  async mounted() {
    //---   Setup Lang Pack   ---//
    this.lang = this.$lang("mods").updates;

    this.getLatest();
  },

  methods: {
    async getUpdate() {
      const device = await Device.getInfo();
      const platform = device.platform;

      //---   Put all strings into 1 array   ---//
      let downloads = new Array();
      for (const i in this.latestVersion.assets) {
        const asset = this.latestVersion.assets[i];
        downloads.push(asset.browser_download_url);
      }

      //---   Pick String For Platform From Above Array   ---//
      if (platform == "ios") {
        this.update = downloads.filter((m) => m.includes(".ipa"))[0];
      } else {
        this.update = downloads.filter((m) => m.includes(".apk"))[0];
      }

      //---   Set Update As Full Data   ---//
      for (const i in this.latestVersion.assets) {
        const asset = this.latestVersion.assets[i];
        if (asset.browser_download_url == this.update) {
          return (this.update = asset);
        }
      }
    },

    async getLatest() {
      //---   Get Latest Version   ---//
      this.status = "checking";
      const releases = await this.$vuetube.releases;
      this.latestVersion = releases[0];

      //---   Wait like 2 seconds because if people don't see loading, they think it didn't refresh properly   ---//
      if (!this.$route.query.nowait)
        await require("~/plugins/utils").delay(2000);

      //---   Get Proper File   ---//
      this.getUpdate();

      //---   Kick Off Update Notice   ---//
      if (this.latestVersion.tag_name != this.installedVersion) {
        this.status = "available";
      } else {
        this.status = "latest";
      }
    },

    async install() {
      this.downloading = true;
      await this.$update(this.update.browser_download_url).catch(() => {
        this.downloading = false;
      });
      //window.open(this.update.browser_download_url, '_blank');
    },
  },
};
</script>

<style scoped>
.bottom {
  position: absolute;
  padding: 2em;
  bottom: 0;
  right: 0;
}
</style>
