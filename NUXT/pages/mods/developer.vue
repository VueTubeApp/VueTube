<template>
  <div>
    <!--   Top Notice   -->
    <center style="margin: 2em">
      <h1>{{ lang.registryeditor }}</h1>
      <v-alert text outlined type="warning">
        {{ lang.registrywarning }}
      </v-alert>
    </center>

    <!--   Add New Key Button   -->
    <center>
      <v-btn
      rounded
        @click="
          addDialog = !addDialog;
          selectedKey = null;
          selectedKeyData = null;
        "
      >
        <v-icon style="margin-right: 0.25em">mdi-plus</v-icon>
        {{ lang.createentry }}
      </v-btn>
    </center>

    <!--   Registry List Loader   -->
    <v-list-item v-for="(item, index) in keys" :key="index">
      <v-card
        class="card"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
        :style="{ borderRadius: `${roundTweak / 2}rem` }"
      >
        <v-card-title v-text="item.key" />
        <v-card-text v-text="item.value" />
        <v-card-actions>
          <v-spacer />
          <v-btn text class="actionButton" @click="confirmEdit(item)"
            ><v-icon color="primary">mdi-pencil</v-icon></v-btn
          >
          <v-btn text class="actionButton" @click="confirmDelete(item)"
            ><v-icon color="error">mdi-delete</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-list-item>

    <!--   Delete Entry Dialog   -->
    <v-dialog v-model="deleteDialog" width="500">
      <v-card
        class="rounded-lg"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
      >
        <v-card-title class="text-h5">{{ lang.confirmdelete }}</v-card-title>
        <v-card-text
          >{{ lang.areyousure }}
          <span class="highlight" v-text="selectedKey" />?</v-card-text
        >
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">
            {{ lang.cancel }}
          </v-btn>
          <v-btn color="primary" text @click="deleteKey()">
            {{ lang.delete }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--   Edit Entry Dialog   -->
    <v-dialog v-model="editDialog" width="500">
      <v-card
        class="rounded-lg"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
      >
        <v-card-title class="text-h5" v-text="selectedKey" />
        <v-card-text>
          <v-text-field v-model="selectedKeyData" label="Value" solo />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="editDialog = false">
            {{ lang.cancel }}
          </v-btn>
          <v-btn color="primary" text @click="updateKey()">
            {{ lang.change }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--   Add Entry Dialog   -->
    <v-dialog v-model="addDialog" width="500">
      <v-card
        class="rounded-lg"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
      >
        <v-card-title class="text-h5">{{ lang.createentryfull }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="selectedKey" :label="lang.key" solo />
          <v-text-field
            v-model="selectedKeyData"
            :label="lang.value"
            solo
            style="margin-bottom: -2em"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addDialog = false">
            {{ lang.cancel }}
          </v-btn>
          <v-btn color="primary" text @click="createKey()">
            {{ lang.create }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: {},
      keys: [],

      selectedKey: null,
      selectedKeyData: null,
      deleteDialog: false,
      editDialog: false,
      addDialog: false,
    };
  },
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },
  mounted() {
    this.syncRegistry();
    const lang = this.$lang();
    this.lang = lang.mods.developer;
  },

  methods: {
    syncRegistry() {
      this.keys = [];
      const localStorageKeys = Object.keys(localStorage);
      for (const i in localStorageKeys) {
        const key = localStorageKeys[i];
        const keyValue = localStorage.getItem(key);
        this.keys.push({ key: key, value: keyValue });
      }
    },

    confirmDelete(item) {
      this.selectedKey = item.key;
      this.deleteDialog = true;
    },
    confirmEdit(item) {
      this.selectedKey = item.key;
      this.selectedKeyData = item.value;
      this.editDialog = true;
    },

    deleteKey() {
      this.deleteDialog = false;
      localStorage.removeItem(this.selectedKey);
      this.syncRegistry();
    },
    updateKey() {
      this.editDialog = false;
      localStorage.setItem(this.selectedKey, this.selectedKeyData);
      this.syncRegistry();
    },
    createKey() {
      this.addDialog = false;
      localStorage.setItem(this.selectedKey, this.selectedKeyData);
      this.syncRegistry();
    },
  },
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
