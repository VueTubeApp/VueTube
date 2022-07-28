<template>
  <div>
    <v-bottom-sheet
      v-model="sheet"
      :attach="$parent.$refs.vidcontainer"
      style="z-index: 777777"
      scrollable
    >
      <template #activator="{ on, attrs }">
        <v-btn
          fab
          text
          small
          :color="$route.name === 'watch' ? 'white' : ''"
          v-bind="attrs"
          v-on="on"
        >
          {{ currentSpeed }}X
        </v-btn>
      </template>
      <v-card class="background">
        <v-subheader
          v-touch="{
            down: () => (sheet = false),
          }"
        >
          Playback Speed
          <v-spacer />
          <v-btn fab text small color="white" @click="sheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-subheader>
        <v-divider />
        <v-card-text style="height: 50vh" class="pa-0">
          <v-list-item
            v-for="sped in speeds"
            :key="sped"
            @click="(sheet = false), $emit('speed', sped)"
          >
            <!-- // TODO: save playbackRate to localStorage and manage via store/video/index.js -->
            <v-list-item-avatar>
              <v-icon
                :color="
                  currentSpeed === sped
                    ? 'primary'
                    : $vuetify.theme.dark
                    ? 'background lighten-2'
                    : 'background darken-2'
                "
                v-text="currentSpeed === sped ? 'mdi-check' : 'mdi-speedometer'"
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ sped }}X</v-list-item-title>
          </v-list-item>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    currentSpeed: {
      type: Number,
      required: true,
    },
  },
  emits: ["speed"],
  data: () => ({
    sheet: false,
    speeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4],
  }),
};
</script>
