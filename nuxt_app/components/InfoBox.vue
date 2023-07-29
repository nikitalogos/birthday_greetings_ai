<script>
export default defineNuxtComponent({});
</script>

<template lang="pug">
div.info-box
  i.info.circle.icon
  div
    slot
</template>

<style lang="scss" scoped>
.info-box {
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 20px 0;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;

  i {
    margin-right: 10px;
    font-size: 1.5rem;
    color: var(--accent-color);
  }
}
</style>
