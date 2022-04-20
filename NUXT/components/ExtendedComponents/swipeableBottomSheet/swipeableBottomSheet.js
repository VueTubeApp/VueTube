import "./swipeableBottomSheet.sass";

// Extensions
import { VDialog } from "vuetify/lib";

/* @vue/component */
export default VDialog.extend({
  name: "swipeable-bottom-sheet",

  props: {
    inset: Boolean,
    maxWidth: [String, Number],
    transition: {
      type: String,
      default: "bottom-sheet-transition",
    },
  },

  computed: {
    classes() {
      return {
        ...VDialog.options.computed.classes.call(this),
        "swipeable-bottom-sheet": true,
        "swipeable-bottom-sheet--inset": this.inset,
      };
    },
    contentClasses() {
      return {
        "swipeable-bottom-sheet__content": true,
        "swipeable-bottom-sheet__content--active": this.isActive,
      };
    },
  },
});
