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
import language from '~/components/Settings/language.vue';
  export default {
    layout: "empty",
    components: {
      language
    },
    data() {
        return {
            lang: {},
        }
    },
    mounted() {
        this.lang = this.$lang("events");
    },
    methods: {
        okay() {
            this.$router.replace('/');
        }
    }
}
</script>