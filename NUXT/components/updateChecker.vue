<template>
    <div>
        <v-snackbar v-model="updateSnackbar" class="updateBar" :timeout="updateSnackbarTimeout">
        {{ updateSnackbarText }}

        <template v-slot:action="{ attrs }">
            <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
        </v-snackbar>
    </div>
</template>

<style scoped>
.updateBar {
    z-index: 99999999;
    
}
</style>

<script>
export default {
    data() {
        return {
            updateSnackbar: false,
            updateSnackbarText: "An update is available",
            updateSnackbarTimeout: 5000
        }
    },
    
    async mounted() {
        const commits = await this.$vuetube.commits;
        if (commits[0].sha != process.env.appVersion) {
            this.updateSnackbar = true;
        }
    },
}
</script>