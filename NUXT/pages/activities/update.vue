<template>
<div>
    <center class="container">
        <v-img
            src="/icon.svg"
            width="10rem"
            height="10rem"
            :class="$vuetify.theme.dark ? '' : 'invert'"
        />
        <h1>{{ lang.updated }}</h1>
        <p><span class="version">{{ oldVer }}</span> <v-icon>mdi-arrow-right</v-icon> <span class="version">{{ newVer }}</span></p>
    </center>

    <v-btn @click="okay()" class="rounded-xl primary nextButton">{{ lang.awesome }} <v-icon style="margin-left: 0.5em;">mdi-arrow-right</v-icon></v-btn>
</div>
</template>

<style scoped>
.nextButton {
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translate(-50%, 0);
}

.container {
    width: 100%;
}

.version {
    background: rgba(100,100,100,0.5);
    border-radius: 3px;
    padding: 3px;
}
</style>

<script>
import language from '~/components/Settings/language.vue';
  export default {
    layout: "empty",
    components: {
      language
    },
    data() {
        return {
            lang: {},
            newVer: "...",
            oldVer: "..."
        }
    },
    mounted() {
        this.lang = this.$lang("events");

        this.oldVer = localStorage.getItem("lastRunVersion").substring(0, 7);
        this.newVer = process.env.appVersion.substring(0, 7);
    },
    methods: {
        okay() {
            localStorage.setItem("lastRunVersion", process.env.appVersion);
            this.$router.replace('/');
        }
    }
}
</script>