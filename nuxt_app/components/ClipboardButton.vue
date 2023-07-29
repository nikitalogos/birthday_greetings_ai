<script>
export default defineNuxtComponent({
  props: {
    name: {
      type: String,
      default: "text",
    },
    text: {
      type: String,
      required: true,
    },
    accent: {
      type: Boolean,
      default: false,
    },
    compact: {
      type: Boolean,
      default: false,
    },
    popup_right: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    copy_to_clipboard_impl(text_to_copy) {
      // magic
      const el = document.createElement("textarea"); // Create a <textarea> element
      el.value = text_to_copy; // Set its value to the string that you want copied
      el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
      el.style.position = "absolute";
      el.style.left = "-9999px"; // Move outside the screen to make it invisible
      document.body.appendChild(el); // Append the <textarea> element to the HTML document
      const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
          ? document.getSelection().getRangeAt(0) // Store selection if found
          : false; // Mark as false to know no selection existed before
      el.select(); // Select the <textarea> content
      document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
      document.body.removeChild(el); // Remove the <textarea> element
      if (selected) {
        // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
      }
    },
    copy_to_clipboard(event) {
      this.copy_to_clipboard_impl(this.text);

      const label_el = event.currentTarget.querySelector(".copied");
      label_el.classList.add("show");
      setTimeout(() => {
        label_el.classList.remove("show");
      }, 1000);
    },
  },
});
</script>

<template lang="pug">
button(v-if="compact" v-tooltip :aria-label="`Copy ${name} to clipboard`" @click="copy_to_clipboard($event)")
  i.clipboard.icon(:class="{accent: accent}")
  span.copied(:class="{right: popup_right}") Copied!

button.button(v-else @click="copy_to_clipboard($event)")
  span(style="margin-right: 5px") Copy {{ name }}
  i.clipboard.icon(:class="{accent: accent}")
  span.copied(:class="{right: popup_right}") Copied!
</template>

<style lang="scss" scoped>
button {
  position: relative;
  span.copied {
    position: absolute;
    z-index: 1;

    padding: 5px 10px;
    top: 50%;
    transform: translateY(-50%);

    &:not(.right) {
      right: 100%;
      margin-right: 5px;
    }
    &.right {
      left: 100%;
      margin-left: 5px;
    }

    border: 1px solid;
    border-radius: 4px;

    color: var(--accent-color);
    background-color: rgba(0, 0, 0, 0.8);

    visibility: hidden;
    &.show {
      visibility: visible;
    }
  }

  i.clipboard.icon.accent {
    color: var(--accent-color);
  }
}
</style>
