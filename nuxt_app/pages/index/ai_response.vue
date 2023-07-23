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
    copy_to_clipboard(event, text) {
      navigator.clipboard.writeText(text);

      const label_el = event.currentTarget.querySelector(".copied");
      label_el.classList.add("show");
      setTimeout(() => {
        label_el.classList.remove("show");
      }, 1000);
    },
    scroll_to_bottom() {
      const messages = this.$el.querySelector(".messages");
      messages.scrollTop = messages.scrollHeight;
    },
    async regenerate_response() {
      await this.chatbot.run();
      this.scroll_to_bottom();
    },
  },
  mounted() {
    this.scroll_to_bottom();
  },
});
</script>

<template lang="pug">
div.page-wrapper
  h1 AI Response
  p To clear history, refresh the page
  p You can download conversation:
    button.button(@click="chatbot.export_txt") as .txt
    button.button(@click="chatbot.export_json") as .json

  div.messages-wrapper
    div.messages
      div.message(v-for="message in chatbot.chat_history" :key="message.time")
        div.loading(v-if="!message.completed")
          div.ui.active.inline.loader
          div Waiting for response...
        div(v-else)
          div.prompt.phrase
            b You:
            span
              | {{ message.is_prompt_visible ? message.prompt : "..." }}
            button(v-if="message.is_prompt_visible" @click="copy_to_clipboard($event, message.prompt)" v-tooltip aria-label="Copy prompt to clipboard")
              i.clipboard.icon
              span.copied Copied!
            button(v-if="message.is_prompt_visible" @click="message.is_prompt_visible = false" v-tooltip aria-label="Hide prompt")
              i.eye.icon
            button(v-else @click="message.is_prompt_visible = true" v-tooltip aria-label="Show prompt")
              i.eye.slash.icon
          div.response.phrase(:class="{error: message.is_error}")
            b AI:
            span {{ chatbot.response_or_error(message) }}
            button(@click="copy_to_clipboard($event, chatbot.response_or_error(message))" v-tooltip aria-label="Copy response to clipboard")
              i.clipboard.icon
              span.copied Copied!
          div.time
            i.time.icon
            | {{ format_date(message.timestamp_ms) }}
            i.hourglass.end.icon(style="margin-left: 10px")
            | {{ (message.duration_ms / 1000).toFixed(2) }}s
    div.shadow.top
    div.shadow.bottom

  div
    button.button(@click="regenerate_response")
      i.sync.icon
      | Regenerate response
    button.button(@click="$router.push('/params')")
      i.edit.outline.icon
      | Edit params
</template>

<style scoped lang="scss">
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
  box-sizing: padding-box;

  overflow-y: scroll;

  .message {
    margin: 10px;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 4px;

    width: calc(100% - 20px);
    box-sizing: border-box;

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;

      div:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .phrase {
      display: flex;
      flex-direction: row;
      align-items: top;
      justify-content: left;

      margin-bottom: 10px;

      b {
        width: 40px;
        flex-shrink: 0;
      }
      button {
        height: fit-content;
        margin-left: 10px;
        font-size: 0.8rem;

        color: var(--color-faded);
        :hover {
          color: var(--color);
        }

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
      }

      &.response {
        &.error {
          color: var(--error-color);
          font-style: italic;
        }

        button {
          font-size: 1rem;
        }
      }

      &.prompt,
      &.response {
        white-space: pre-line;
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
