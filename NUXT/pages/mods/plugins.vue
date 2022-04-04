<template>
  <div class="py-2">
    <v-list-item v-for="(plugin, index) in plugins" :key="index" class="my-1">
      <v-card flat class="card my-2 background" :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'">


        <v-card-title style="padding: 0 0.25em 0 0.75em">{{ plugin.manifest.name }} {{ plugin.manifest.version }}</v-card-title>
        <div style="padding: 1em 1em 0 0.75em; padding-left: 1.25em;">by {{ plugin.manifest.author }} {{ plugin.manifest.license ? `(${plugin.manifest.license})` : '' }}</div>
        <v-card-text>
          {{ plugin.manifest.description }}
        </v-card-text>

      </v-card>
    </v-list-item>
  </div>
</template>

<style scoped>
  .card {
    width: 100%;
  }

  .subtitle {
    margin: 0.4em;
    font-size: 0.75em;
    transform: translateY(5%);
  }

  .date {
    transform: translateY(-40%);
  }

  .btn-icon {
    margin-right: 0.25em;
  }

  .tags {
    margin-left: 0.5em;
  }

</style>

<script>

  export default {
    data() {
      return {
        plugins: new Array(),
        installedVersion: process.env.appVersion,
      };
    },
    async mounted() {

      const temp = require('~/plugins/demoPlugin.js');
      this.plugins = [temp];

    }
  };

</script>
