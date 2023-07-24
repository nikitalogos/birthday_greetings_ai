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
  },
  methods: {
    copy_to_clipboard(event) {
      navigator.clipboard.writeText(this.text);

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
button(@click="copy_to_clipboard($event)" v-tooltip :aria-label="`Copy ${name} to clipboard`")
  i.clipboard.icon(:class="{accent: accent}")
  span.copied Copied!
</template>

<style lang="scss" scoped>
button {
  position: relative;
  span.copied {
    position: absolute;
    z-index: 1;

    right: 100%;
    margin-right: 5px;
    padding: 5px 10px;
    top: 50%;
    margin-top: -50%;

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
