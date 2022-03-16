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
    mounted() {
        location.href = `/${localStorage.getItem("startPage") || "home"}`
    }
}
</script>