<template>
<div class="container">
    <center>
        <v-img
            src="/icon.svg"
            width="10rem"
            height="10rem"
            :class="$vuetify.theme.dark ? '' : 'invert'"
        />
        <h1>{{ lang.updated }}</h1>
        <v-btn class="rounded-xl primary">{{ lang.awesome }}</v-btn>
    </center>
</div>
</template>

<script>
export default {
    layout: "empty",

    data() {
        return {
            lang: {}
        }
    },
    mounted() {
        this.lang = this.$lang("events");
    }
}
</script>