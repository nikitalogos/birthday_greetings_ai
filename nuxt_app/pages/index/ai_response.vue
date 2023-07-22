<script>
export default defineNuxtComponent({
  data() {
    return {
      chatbot,
    };
  }
});
</script>

<template lang="pug">
div.wrapper
  h1 AI Response
  p To clear history, refresh the page
  p You can download conversation:
    button.button(@click="chatbot.export_txt") as .txt
    button.button(@click="chatbot.export_json") as .json

  div.chat
    div.message(v-for="message in chatbot.chat_history" :key="message.time")
      div.message__text {{ message.response }}
      div.message__time {{ message.time }}
</template>

<style scoped lang="scss">
.wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
}
</style>
