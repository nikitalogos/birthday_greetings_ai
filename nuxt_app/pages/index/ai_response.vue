<script>
export default defineNuxtComponent({
  data() {
    return {
      chatbot,
    };
  },
});
</script>

<template lang="pug">
div.wrapper
  h1 AI Response
  p To clear history, refresh the page
  p You can download conversation:
    button.button(@click="chatbot.export_txt") as .txt
    button.button(@click="chatbot.export_json") as .json

  div.messages-wrapper
    div.messages
      div.message(v-for="message in chatbot.chat_history" :key="message.time")
        div.message__text {{ message.response }}
        div.message__time {{ message.time }}
    div.shadow.top
    div.shadow.bottom
</template>

<style scoped lang="scss">
.wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.messages-wrapper {
  width: 100%;
  height: 500px;
  overflow: hidden;

  position: relative;

  .shadow {
    position: absolute;

    // avoid corner effects of shadow
    width: 200%;
    left: -50%;
    height: 100px;
    &.top {
      bottom: 100%;
    }
    &.bottom {
      top: 100%;
    }

    box-shadow:
      0 0 5px var(--accent-color-transparent),
      0 0 20px var(--accent-color-transparent),
      0 0 15px var(--accent-color-transparent),
      0 0 20px var(--accent-color-transparent);
  }
}

.messages {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 100%;
  padding: 10px;

  overflow-y: scroll;

  .message {
    margin: 10px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
}
</style>
