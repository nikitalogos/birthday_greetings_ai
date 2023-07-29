<script>
export default defineNuxtComponent({
  data() {
    return {
      params,
    };
  },
  created() {
    // init params from query string.
    // This is for external applications like https://github.com/nikitalogos/birthday_reminder
    this.params.name.value = this.$route.query.name ?? null;
    const date_str = this.$route.query.date_of_birth ?? "";
    this.params.date_of_birth.value = isNaN(Date.parse(date_str)) ? null : new Date(date_str);

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
