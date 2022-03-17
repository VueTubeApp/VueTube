<template>
    <center style="padding-top: 3em;">
      <v-progress-circular
        size="50"
        indeterminate
        color="primary"
      />
    </center>
</template>

<script>
export default {
    layout: "empty",
    mounted() {
        this.$router.push(`/${localStorage.getItem("startPage") || "home"}`);
    }
}
</script>
