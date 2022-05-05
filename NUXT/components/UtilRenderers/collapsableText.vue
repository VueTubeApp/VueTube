<template>
  <div class="collapsable-text">
    <div
      class="text-content"
      ref="textContent"
      :class="expanded ? 'expanded' : 'collapsed'"
    >
      <slot></slot>
    </div>
    <a
      class="toggle-collapse background--text font-weight-bold"
      @click.stop.prevent="expanded = !expanded"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      v-if="expandable"
      v-text="expanded ? collapseText : expandText"
    ></a>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Number,
      default: 4,
    },
    text: {
      type: String,
      default: "",
    },
    expandText: {
      type: String,
      default: "Show more",
    },
    collapseText: {
      type: String,
      default: "Show less",
    },
  },

  data() {
    return {
      expanded: false,
      expandable: false,
    };
  },

  mounted() {
    this.checkExpandable();
  },

  methods: {
    checkExpandable() {
      if (
        this.$refs.textContent &&
        this.$refs.textContent.offsetHeight <
          this.$refs.textContent.scrollHeight
      ) {
        this.expandable = true;
      } else {
        this.expandable = false;
      }
    },
  },

  computed: {
    cssProps() {
      return {
        "--lines": this.lines,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin truncate($rows) {
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: $rows;
  -webkit-box-orient: vertical;
}

.toggle-collapse {
  text-decoration: none;
}

.collapsable-text {
  display: flex;
  flex-direction: column;
  flex-basis: auto;
  .text-content {
    white-space: pre-line;
    &.collapsed {
      @include truncate(4);
    }
  }
}
</style>
