<template>
  <div class="px-6 py-3">
    <h3 class="my-2">Description</h3>
    <p>{{ $store.state.channel.descriptionPreview }}</p>
    <br />
    <br />
    <h3 class="my-2">Links</h3>
    <div v-ripple class="py-2 d-flex flex-row">
      <v-avatar tile size="20" color="primary"> </v-avatar>
      <span class="ml-4 primary--text">Social Media</span>
    </div>
    <br />
    <h3 class="my-2">More Info</h3>
    <div v-ripple class="py-2 d-flex flex-row">
      <v-icon size="24" color="primary">mdi-web</v-icon>
      <span class="ml-4">https://www.youtube.com/c/todo</span>
    </div>
    <div v-ripple class="py-2 d-flex flex-row">
      <v-icon size="24" color="primary">mdi-earth</v-icon>
      <span class="ml-4">United States</span>
    </div>
  </div>
</template>
