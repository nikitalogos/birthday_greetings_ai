<script>
export default defineNuxtComponent({
  data() {
    return {
      chatbot,
    };
  },
  methods: {
    async chatbot_run() {
      alert(await this.chatbot.run("Type first 5 primes"));
    },
  },
  created() {
    this.$router.push("/about");
  },
});
</script>

<template>
  <div>
    <header role="banner" class="sticky">
      <MenuHeader />
    </header>
    <button @click="chatbot_run">chatbot</button>
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
