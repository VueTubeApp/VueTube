<template>
  <div class="swipeableBottomSheet">
    <v-bottom-sheet v-model="sheetMode">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="sheetMode = !sheetMode">
          close
        </v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of
          activator
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: ["enableBottomSheet"],

  computed: {
    sheetMode: {
      get() {
        return this.enableBottomSheet;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>


<style>
</style>