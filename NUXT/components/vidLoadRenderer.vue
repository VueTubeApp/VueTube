// this is an loading animation for videos
<template>
  <div>
    <v-skeleton-loader
      v-for="i in 10"
      :key="i"
      type="image, list-item-avatar-two-line"
    />
  </div>
</template>
