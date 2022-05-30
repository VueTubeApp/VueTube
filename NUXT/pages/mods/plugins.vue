<template>
  <div>

    <div style="margin: 1em;">
      <v-btn style="width: 100%;" class="primary" @click="pickFile()">Load Plugin</v-btn>
      <input type="file" id="filePicker" accept=".js" />
    </div>

    <center v-if="plugins.length == 0" style="margin-top: 2em;">
      <v-icon size="50px">mdi-connection</v-icon>
      <h2>No plugins installed</h2>
    </center>

    <!-- sorry for the mess, I will make a dumb (styles only) standardized card component later - Nik -->
    <div
      v-for="(plugin, index) in plugins"
      :key="index"
      flat
      class="card d-flex mb-4 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        margin: $store.state.tweaks.roundTweak > 0 ? '0 1rem' : '0',
        padding:
          $store.state.tweaks.roundTweak > 0
            ? '.75rem 0rem .75rem 1rem'
            : '.75rem .75rem .75rem 1.5rem',
      }"
    >
      <div>
        <v-card-title class="pa-0">
          {{ plugin.manifest.name }}
          {{ plugin.manifest.version }}
        </v-card-title>
        <v-card-text
          class="pa-0 mb-3 background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
        >
          by {{ plugin.manifest.author }}
          {{ plugin.manifest.license ? `(${plugin.manifest.license})` : "" }}
        </v-card-text>
        <v-card-text class="pa-0">
          {{ plugin.manifest.description }}
        </v-card-text>
      </div>
      <v-switch
        disabled
        style="pointer-events: none"
        class="my-0"
        persistent-hint
        inset
      />
    </div>
  </div>
</template>

<style scoped>
#filePicker {
  visibility: hidden;
  display: none;
}
</style>

<script>
export default {
  data() {
    return {
      plugins: [],
      installedVersion: process.env.appVersion,
    };
  },
  async mounted() {
    //this.plugins = await this.$tppl.list;

    document.getElementById('filePicker').onchange = function() {
      const file = document.getElementById("filePicker").files[0];

    };


  },
  methods: {
    pickFile() {
      document.getElementById("filePicker").click();
    }
  }
};
</script>
