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
          small
          color="white"
          style="position: absolute; bottom: 0.25rem; right: 3rem"
          v-bind="attrs"
          v-on="on"
        >
          {{ sources.find((src) => src.url == video.src).qualityLabel }}
        </v-btn>
      </template>
      <v-card class="background">
        <v-subheader
          v-touch="{
            down: () => (sheet = false),
          }"
        >
          Quality for current video
          <v-btn
            fab
            text
            small
            color="white"
            style="position: absolute; right: 0.25rem"
            @click="sheet = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-subheader>
        <v-divider />
        <v-card-text style="max-height: 50vh" class="pa-0">
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
                    ? 'mdi-radiobox-marked'
                    : 'mdi-radiobox-blank'
                "
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ src.qualityLabel }} ({{ src.quality }})
            </v-list-item-title>
          </v-list-item>
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
};
</script>
