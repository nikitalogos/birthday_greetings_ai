<script>
export default defineNuxtComponent({
  data() {
    return {
      menu,
    };
  },
});
</script>

<template lang="pug">
div.menu-container
  div.menu-wrapper
    div.title {{ menu.title }}
    div.menu
      nuxt-link.item.link(
        v-for="(item, idx) in menu.items"
        :key="idx"
        :to="item.path"
        :class="{active: $route.path.includes(item.path)}"
      ) {{ item.title }}
</template>

<style lang="scss" scoped>
.menu-container {
  backdrop-filter: blur(10px);
  box-shadow:
    0 0 5px var(--accent-color-transparent),
    0 0 20px var(--accent-color-transparent),
    0 0 15px var(--accent-color-transparent),
    0 0 20px var(--accent-color-transparent);
  text-shadow:
    0 0 5px var(--accent-color-transparent),
    0 0 20px var(--accent-color-transparent),
    0 0 15px var(--accent-color-transparent),
    0 0 20px var(--accent-color-transparent);
}

.menu-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  max-width: var(--page-max-width);
  margin: 0 auto;

  .title {
    padding: 10px;
    margin-right: 20px;

    font-weight: bold;

    background: linear-gradient(-45deg, var(--accent-color), var(--light-grey-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .item {
    padding: 10px;

    &.active {
      background: var(--accent-color-transparent);
    }
  }
}
</style>
