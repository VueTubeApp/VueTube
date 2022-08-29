<template>
  <div style="padding: 2em;">


    <v-icon x-large color="primary" style="padding-bottom: 0.25em;">mdi-cellphone-arrow-down</v-icon>
    <h1>{{ lang.updated }}</h1>
    <p>{{ oldVer }} <v-icon>mdi-arrow-right</v-icon> {{ newVer }}</p>
    <div class="bottom">
      <v-btn rounded color="primary" @click="okay()">{{ lang.awesome }}</v-btn>
    </div>


  </div>
</template>

<style scoped>
.bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2em;
}
</style>

<script>
import language from "~/components/Settings/language.vue";
export default {
  layout: "empty",
  components: {
    language,
  },
  data() {
    return {
      lang: {},
      newVer: "...",
      oldVer: "...",
    };
  },
  mounted() {
    this.lang = this.$lang("events");

    this.oldVer = localStorage.getItem("lastRunVersion").substring(0, 7);
    this.newVer = process.env.version.substring(0, 7);
  },
  methods: {
    okay() {
      localStorage.setItem("lastRunVersion", process.env.version);
      this.$router.replace("/");
    },
  },
};
</script>
