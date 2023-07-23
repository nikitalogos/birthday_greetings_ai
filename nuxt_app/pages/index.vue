<script>
export default defineNuxtComponent({
  created() {
    if (this.$route.path == "/") this.$router.push("/api_token");
  },
});
</script>

<template>
  <div>
    <header role="banner" class="sticky">
      <MenuHeader />
    </header>
    <main role="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped lang="scss">
.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  //  width: 100%;
  z-index: 1000;
}
</style>
