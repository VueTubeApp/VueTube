<template>
  <div>
    <community-card />
    <div
      v-if="
        !($store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0)
      "
      class="separator-bottom background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      style="height: 4px"
    ></div>
  </div>
</template>

<script>
import communityCard from "../../components/communityCard.vue";
export default {
  components: {
    communityCard,
  },
};
</script>
