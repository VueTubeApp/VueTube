<template>
  <div>


    <!--   Top Notice   -->
    <center style="margin: 2em;">
      <h1>VueTube Registry</h1>
      <v-alert text outlined type="warning">
        ONLY TOUCH THIS IF YOU KNOW WHAT YOU ARE DOING!<br>
        MESSING WITH SETTINGS MAY CAUSE YOUR APP TO BREAK!
      </v-alert>
    </center>

    <!--   Registry List Loader   -->
    <v-list-item v-for="(item, index) in keys" :key="index">
      <v-card class="card rounded-lg" :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'">
        <v-card-title v-text="item.key" />
        <v-card-text v-text="item.value" />
        <v-card-actions>
          <v-spacer />
          <v-btn text class="actionButton" disabled><v-icon color="primary">mdi-pencil</v-icon></v-btn>
          <v-btn text class="actionButton" @click="confirmDelete(item)"><v-icon color="error">mdi-delete</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-list-item>

    <!--   Delete Entry Dialog   -->
    <v-dialog v-model="deleteDialog" width="500">

      <v-card :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'">
        <v-card-title class="text-h5">Confirm Delete</v-card-title>

        <v-card-text>Are you sure that you want to delete <span class="highlight" v-text="selectedKey" />?</v-card-text>

        <v-alert text outlined type="warning" style="margin: 0 2em 2em; 2em;">Deleting random keys may cause the app to break!</v-alert>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">No</v-btn>
          <v-btn color="primary" text @click="deleteKey()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </div>
</template>

<script>
export default {
  data() {
    return {
      keys: [],

      selectedKey: null,
      deleteDialog: false
    };
  },
  mounted() {
    this.syncRegistry();
  },

  methods: {

    syncRegistry() {
      this.keys = [];
      const localStorageKeys = Object.keys(localStorage)
      for (const i in localStorageKeys) {
        const key = localStorageKeys[i];
        const keyValue = localStorage.getItem(key);
        this.keys.push({key: key, value: keyValue});
      }
    },

    confirmDelete(item) {
      this.selectedKey = item.key;
      this.deleteDialog = true;
    },
    deleteKey() {
      this.deleteDialog = false;
      localStorage.removeItem(this.selectedKey);
      this.syncRegistry();
    }
  }
};
</script>

<style scoped>
.card {
  margin: 1em;
  width: 100%;
}
.actionButton {
  min-width: 1em !important;
}
.highlight {
  background: #999;
  border-radius: 5px;
  padding: 0.25em;
}
</style>
