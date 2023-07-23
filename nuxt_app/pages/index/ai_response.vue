<script>
export default defineNuxtComponent({
  data() {
    return {
      chatbot,
    };
  },
  methods: {
    format_date(timestamp_ms) {
      const date = new Date(timestamp_ms);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
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
        div.prompt.phrase
          b You:
          span
            | {{ message.is_prompt_visible ? message.prompt : "..." }}
            button(v-if="message.is_prompt_visible" @click="message.is_prompt_visible = false" aria-label="Hide prompt")
              i.eye.icon
            button(v-else @click="message.is_prompt_visible = true" aria-label="Show prompt")
              i.eye.slash.icon
        div.response.phrase(:class="{error: message.is_error}")
          b AI:
          span {{ message.is_error ? `Error: ${message.error_str}` : message.response }}
        div.time
          i.time.icon
          | {{ format_date(message.timestamp_ms) }}
          i.hourglass.end.icon(style="margin-left: 10px")
          | {{ (message.duration_ms / 1000).toFixed(2) }}s
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

    width: calc(100% - 40px);

    .phrase {
      display: flex;
      flex-direction: row;
      align-items: top;
      justify-content: left;

      margin-bottom: 10px;

      b {
        width: 40px;
      }
      span {
        flex: 1;
      }
      button {
        margin-left: 10px;
        font-size: 0.8rem;
        color: var(--color-faded);
        :hover {
          color: var(--color);
        }
      }
    }
    .response {
      &.error {
        color: var(--error-color);
        font-style: italic;
      }
    }

    .time {
      font-size: 0.8em;
      color: var(--color-faded);
      text-align: right;
    }
  }
}
</style>
