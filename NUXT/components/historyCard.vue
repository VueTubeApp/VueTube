<template>
  <v-card
    v-ripple
    class="background d-flex flex-row overflow-hidden mb-4 mx-4"
    style="height: 4.5rem !important"
    :class="
      $store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0
        ? $vuetify.theme.dark
          ? 'lighten-1'
          : 'darken-1'
        : ''
    "
    :style="{
      borderRadius: $store.state.tweaks.roundThumb
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
    flat
  >
    <v-card
      class="d-flex flex-row w-50 elevation-0"
      :to="`/watch?v=${video.id}`"
    >
      <v-img
        :src="thumbnail"
        aspect-ratio="1.7778"
        style="position: relative; width: 8rem"
        :class="$vuetify.theme.dark ? 'lighten-3' : 'darken-3'"
        :style="{
          borderRadius: $store.state.tweaks.roundThumb
            ? `${$store.state.tweaks.roundTweak / 3}rem`
            : '0',
        }"
      >
      </v-img>
      <div
        v-emoji
        style="font-size: 0.75rem !important"
        class="d-flex flex-column ml-2"
      >
        <b
          class="text-left"
          style="
             {
              height: 1.5rem;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              word-wrap: break-word;
              white-space: normal;
            }
          "
          >{{ video.title }}
        </b>
        <div
          class="background--text caption mt-2 text-left d-inline-block text-truncate"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          style="
             {
              height: 0.75rem;
            }
          "
        >
          {{ video.channel }}
        </div>
      </div>
    </v-card>

    <v-spacer></v-spacer>
    <div class="d-flex flex-column">
      <v-btn
        text
        tile
        elevation="0"
        class="flex-grow-1"
        style="width: 2rem !important"
        @click="deleted"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["video"],
  computed: {
    thumbnail() {
      return `https://img.youtube.com/vi/${this.video.id}/maxresdefault.jpg`;
    },
  },
  methods: {
    deleted() {
      this.$emit("deleted");
    },
  },
};
</script>