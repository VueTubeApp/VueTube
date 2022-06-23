<template>
  <div>
    <center class="container" ref="stage0">
      <v-img
        src="/icon.svg"
        width="10rem"
        height="10rem"
        :class="$vuetify.theme.dark ? '' : 'invert'"
      />
      <h1>{{ lang.welcome }}</h1>
      <p>{{ lang.tagline }}</p>
    </center>

    <center class="container hidden" ref="stage1">
      <h1>{{ lang.langsetup }}</h1>
      <language style="width: 80%" />
    </center>

    <center class="container hidden" ref="stage2">
      <h1>{{ lang.featuresetup }}</h1>
      <v-checkbox disabled v-model="ryd" :label="lang.enableryd" />
      <v-checkbox disabled v-model="sponsorBlock" :label="lang.enablespb" />
    </center>

    <center class="container hidden" ref="stage3">
      <h1>{{ lang.thanks }}</h1>
      <h3>{{ lang.enjoy }}</h3>
    </center>

    <v-btn @click="next()" class="rounded-xl primary nextButton"
      >{{ lang.next }}
      <v-icon style="margin-left: 0.5em">mdi-arrow-right</v-icon></v-btn
    >
  </div>
</template>

<style scoped>
.nextButton {
  position: absolute;
  bottom: 1em;
  right: 2em;
}

.hidden {
  display: none;
}

.fullWidth {
  width: 100%;
}

.container {
  width: 100%;
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
      stage: 0,

      ryd: true,
      sponsorBlock: true,
    };
  },
  mounted() {
    this.lang = this.$lang("events");
  },
  methods: {
    next() {
      this.$refs["stage" + this.stage].style.display = "none";
      this.stage++;

      if (!this.$refs["stage" + this.stage]) {
        localStorage.setItem("lastRunVersion", process.env.appVersion);
        localStorage.setItem("firstTimeSetupComplete", true);
        this.$router.replace("/");
      }

      this.$refs["stage" + this.stage].style.display = "block";
    },
  },
};
</script>
