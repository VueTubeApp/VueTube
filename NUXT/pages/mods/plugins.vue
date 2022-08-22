<template>
  <div>
    <div style="margin: 1em">
      <v-btn style="width: 100%" class="primary text-none" @click="pickFile()">
        <v-icon style="margin-right: 0.5em">mdi-sd</v-icon>
        Install from storage
      </v-btn>
      <input type="file" id="filePicker" accept="js,.js" />
    </div>

    <center v-if="plugins.length == 0" style="margin-top: 2em">
      <v-icon size="50px">mdi-connection</v-icon>
      <h2>No plugins installed</h2>
    </center>

    <!--   Plugin List Renderer   -->
    <v-card v-for="(plugin, index) in plugins" :key="index">
      <v-card-title>{{ plugin }}</v-card-title>

      <v-card-actions>
        <v-btn style="width: 100%" class="error text-none" @click="remove(plugin)">
          <v-icon style="margin-right: 0.5em">mdi-delete</v-icon>
          Uninstall
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--   End Plugin List Renderer   -->


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
      installedVersion: process.env.version,
    };
  },
  async mounted() {
    //this.plugins = await this.$tppl.list;

    const vm = this;
    document.getElementById("filePicker").onchange = async function () {
      const file = document.getElementById("filePicker").files[0];
      const contents = await vm.readFileContent(file);
      await vm.$tppl.addPlugin(contents);
      this.rebuildList();
    };

    this.rebuildList();
    
  },
  methods: {
    async rebuildList() {
      const pluginsData = await this.$tppl.list;
      this.plugins = pluginsData.files;
    },

    async remove(plugin) {
      await this.$tppl.removePlugin(plugin);
      this.rebuildList();
    },

    pickFile() {
      document.getElementById("filePicker").click();
    },
  },
};
</script>
