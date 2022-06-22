<template>
  <div>
    <center>
      <h2 style="margin: 2em;">{{ lang.packageinstaller }}</h2>
    </center>



    <v-list-item-group>
      <v-list-item v-for="(item, i) in assets" :key="i" @click="dl(item)">
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

  </div>
</template>

<script>
  export default {
    layout: "empty",
    data() {
      return {
        lang: {},
        releases: {},
        assets: [],

        icons: {
            apk: "android",
            ipa: "apple",
            zip: "folder-zip"
        }
      };
    },
    async mounted() {
      const allReleases = await this.$vuetube.releases;
      this.releases = allReleases[this.$route.query.v].assets;
      this.lang = this.$lang("events");


      for (const i in this.releases) {
        const asset = this.releases[i];
        let icon = new String();

        //---   Get Icon Type   ---//
        const fileExt = asset.name.split(".")
        for (const i in this.icons) {
            if (fileExt.includes(i)) {
                icon = this.icons[i];
            }
        }

        //---   Build Asset For Listing   ---//
        this.assets.push({
            name: asset.name,
            icon: "mdi-"+icon,
            download_url: asset.browser_download_url
        })
      }


    },

    methods: {
        dl(item) {
          window.open(item.download_url, '_blank');
          this.$router.push(`/mods/updates`);
        }
    }

  };

</script>
