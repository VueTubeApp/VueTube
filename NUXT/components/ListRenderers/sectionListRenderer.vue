<template>
  <div>
    <v-list-item
      v-for="(renderer, index) in render.contents"
      :key="index"
      class="pa-0 min-height-0"
    >
      <component
        :is="Object.keys(renderer)[0]"
        v-if="getComponents()[Object.keys(renderer)[0]]"
        :key="index"
        :render="renderer[Object.keys(renderer)[0]]"
      ></component>
    </v-list-item>
  </div>
</template>

<script>
import itemSectionRenderer from "~/components/SectionRenderers/itemSectionRenderer.vue";
import shelfRenderer from "~/components/SectionRenderers/shelfRenderer.vue";

export default {
  components: {
    itemSectionRenderer,
    shelfRenderer,
  },
  props: ["render"],

  methods: {
    getComponents() {
      return this.$options.components;
    },
  },
};
</script>
