<template>
  <div>
    <center ref="stage0" class="container">
      <v-img
        src="/icon.svg"
        width="10rem"
        height="10rem"
        :class="$vuetify.theme.dark ? '' : 'invert'"
      />
      <div style="height: 3rem" />
      <h1>{{ lang.welcome }}</h1>
      <div>{{ lang.tagline }}</div>
    </center>

    <center ref="stage1" class="container hidden">
      <h2 class="mb-8">{{ lang.langsetup }}</h2>
      <language style="width: 80%" />
    </center>

    <!--
    <center class="container hidden" ref="stage2">
      <v-autocomplete
      label="API"
      :items="apis"
      style="border-top-right-radius: 1rem !important; border-top-left-radius: 1rem !important; box-shadow: none !important"
      solo
      filled
      class="mx-8"
      ></v-autocomplete>
    </center>
-->

    <center ref="stage2" class="container hidden">
      <h2 class="mb-2">{{ lang.featuresetup }}</h2>
      <v-checkbox
        v-model="watchTelemetry"
        :label="`Personalized Recommendations: ${
          watchTelemetry ? 'Enabled' : 'Disabled'
        }`"
        style="width: 80%"
        dense
      />
      <!-- TODO: translate -->
      <!-- :label="`${lang.enabletelem} ${watchTelemetry ? ..." -->
      <v-checkbox
        v-model="ryd"
        :label="lang.enableryd"
        style="width: 80%"
        disabled
        dense
      />
      <v-checkbox
        v-model="sponsorBlock"
        :label="lang.enablespb"
        style="width: 80%"
        disabled
        dense
      />
    </center>
    <center ref="stage3" class="container hidden" style="width: 80%">
      <h2 class="mb-2">💕</h2>
      <h2 class="mb-2">
        {{ lang.thanks }}
      </h2>
      <h4>{{ lang.enjoy }}</h4>
    </center>

    <v-btn
      class="primary nextButton"
      style="border-radius: 0.75rem"
      @click="next()"
    >
      {{ lang.next }}
      <v-icon style="margin-left: 0.5em">mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import language from "~/components/Settings/language.vue";
export default {
  components: {
    language,
  },
  layout: "empty",
  data() {
    return {
      lang: {},
      stage: 0,

      ryd: true,
      sponsorBlock: true,
      apis: ["youtube.com", "twitch.tv", "odysee.com"],
    };
  },
  computed: {
    watchTelemetry: {
      get() {
        return this.$store.state.watchTelemetry;
      },
      set(value) {
        this.$store.commit("setTelemetryPreference", value);
      },
    },
  },
  mounted() {
    this.lang = this.$lang("events");
  },
  methods: {
    next() {
      this.$refs["stage" + this.stage].style.display = "none";
      this.stage++;

      if (!this.$refs["stage" + this.stage]) {
        localStorage.setItem("lastRunVersion", process.env.version);
        localStorage.setItem("firstTimeSetupComplete", true);
        this.$router.replace("/");
      }

      this.$refs["stage" + this.stage].style.display = "block";
    },
  },
};
</script>

<style scoped>
.nextButton {
  padding-right: 0.5rem !important;
  position: absolute;
  bottom: 1rem;
  right: 10%;
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
