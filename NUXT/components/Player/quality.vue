<template>
  <div>
    <v-bottom-sheet
      v-model="sheet"
      :attach="$parent.$refs.vidcontainer"
      scrollable
    >
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          text
          disabled
          style="position: absolute; bottom: 0.25rem; right: 4rem"
          v-bind="attrs"
          v-on="on"
        >
          HD
        </v-btn>
      </template>
      <v-card class="background">
        <v-subheader>Playback Speed</v-subheader>
        <v-card-text style="height: 50vh" class="ma-0 pa-0">
          <v-list>
            <v-list-item
              v-for="src in sources"
              :key="src"
              @click="(sheet = false), (video.src = src.url)"
            >
              <v-list-item-avatar>
                <v-icon
                  :color="
                    video.src === src.url
                      ? 'primary'
                      : $vuetify.theme.dark
                      ? 'background lighten-2'
                      : 'background darken-2'
                  "
                  v-text="
                    video.src === src.url
                      ? 'mdi-checkbox-outline'
                      : 'mdi-checkbox-blank-outline'
                  "
                ></v-icon>
              </v-list-item-avatar>
              <v-list-item-title>{{ sped }}X</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: ["video", "sources"],
  data: () => ({
    sheet: false,
  }),
  mounted() {
    console.log(
      "sourcessourcessourcessourcessourcessourcessources",
      this.sources
    );
  },
};
</script>
