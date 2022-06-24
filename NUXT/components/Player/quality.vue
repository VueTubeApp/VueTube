<template>
  <div>
    <v-bottom-sheet
      v-model="sheet"
      :attach="$parent.$refs.vidcontainer"
      style="z-index: 777777"
      scrollable
    >
      <template #activator="{ on, attrs }">
        <v-btn fab text small color="white" v-bind="attrs" v-on="on">
          {{
            sources.find((src) => src.url == currentSource.src).qualityLabel
              ? sources.find((src) => src.url == currentSource.src).qualityLabel
              : sources.find((src) => src.url == currentSource.src).quality
          }}
        </v-btn>
      </template>
      <v-card class="background">
        <v-subheader
          v-touch="{
            down: () => (sheet = false),
          }"
        >
          Quality for current video
          <v-spacer />
          <v-btn fab text small color="white" @click="sheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-subheader>
        <v-divider />
        <v-card-text
          style="max-height: 50vh"
          class="pa-0 d-flex flex-column-reverse"
        >
          <v-list-item
            v-for="src in sources"
            :key="src"
            two-line
            @click="(sheet = false), $emit('quality', src.url)"
          >
            <v-list-item-avatar>
              <v-icon
                :color="
                  currentSource.src === src.url
                    ? 'primary'
                    : $vuetify.theme.dark
                    ? 'background lighten-2'
                    : 'background darken-2'
                "
                v-text="
                  currentSource.src === src.url
                    ? 'mdi-radiobox-marked'
                    : 'mdi-radiobox-blank'
                "
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ src.qualityLabel ? src.qualityLabel : "" }} ({{
                  src.quality
                }}) {{ src.bitrate }}bps
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ src.mimeType }} {{ src.averageBitrate }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    currentSource: {
      type: String,
      required: true,
    },
    sources: {
      type: Array,
      required: true,
    },
  },
  emits: ["quality"],
  data: () => ({
    sheet: false,
  }),
};
</script>
