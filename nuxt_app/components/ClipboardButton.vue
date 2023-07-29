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
    tooltip: {
      type: Boolean,
      default: true,
    },
    popup_right: {
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
button(
  :class="{button: !tooltip}"
  :v-tooltip="tooltip"
  :aria-label="`Copy ${name} to clipboard`"
  @click="copy_to_clipboard($event)"
)
  span(v-if="!tooltip" style="margin-right: 5px") Copy  {{ name }}
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
