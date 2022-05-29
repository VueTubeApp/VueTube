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
          style="position: absolute; bottom: 0.25rem; right: 3rem"
          v-bind="attrs"
          v-on="on"
        >
          {{ sources.find((src) => src.url == video.src).qualityLabel }}
        </v-btn>
      </template>
      <v-card
        v-touch="{
          down: () => (sheet = false),
        }"
        class="background"
      >
        <v-subheader>Quality for current video</v-subheader>
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
                    ? 'mdi-checkbox-outline'
                    : 'mdi-checkbox-blank-outline'
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
