<template>
  <div>
    <h4 v-if="render.headerRenderer" class="font-weight-bold shelf-header">
      {{
        render.headerRenderer.elementRenderer.newElement.type.componentType
          .model.shelfHeaderModel.shelfHeaderData.title
      }}
    </h4>
    <component
      v-if="render.content && getComponents()[Object.keys(render.content)[0]]"
      :is="Object.keys(render.content)[0]"
      :render="render.content[Object.keys(render.content)[0]]"
    ></component>
    <div
      v-if="render.separator && render.separator.hasBottomSeparator"
      class="separator-bottom background"
      :class="$vuetify.theme.dark ? 'lighten-4' : 'darken-4'"
      :style="{ height: render.separator.height + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
.shelf-header {
  width: 100%; /* Prevent Loading Weirdness */
  padding: 10px;
}
</style>

<script>
import verticalListRenderer from "~/components/ListRenderers/verticalListRenderer.vue";
import horizontalListRenderer from "~/components/ListRenderers/horizontalListRenderer.vue";

export default {
  components: {
    horizontalListRenderer,
    verticalListRenderer,
  },
  props: ["render"],

  methods: {
    getComponents() {
      return this.$options.components;
    },
  },
};
</script>
