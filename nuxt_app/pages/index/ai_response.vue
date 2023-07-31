<script>
export default defineNuxtComponent({
  data() {
    return {
      params,
      chatbot,
      format_datetime,
    };
  },
  methods: {
    scroll_to_bottom() {
      const messages = this.$el.querySelector(".messages");
      console.log(messages)
      messages.scrollTop = messages.scrollHeight;
    },
    async regenerate_response() {
      setTimeout(this.scroll_to_bottom, 1000);
      await this.chatbot.run();
    },
    open_in_new_tab(url) {
      const new_window = window.open(url, "_blank", "noopener");
      if (new_window) {
        new_window.opener = null;
      }
    },
  },
  mounted() {
    this.scroll_to_bottom();
  },
});
</script>

<template lang="pug">
div.page-wrapper
  div.cover-wrapper
    h1(style="white-space: nowrap;") AI Response
    div(style="flex: 1")
    img(src="/images/boy.png" alt="A boy with a present")

  p To clear history, refresh the page
  p You can download conversation:
    span(style="white-space: nowrap;")
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
            ClipboardButton(v-if="message.is_prompt_visible" name="prompt" :text="message.prompt" compact)
            button(v-if="message.is_prompt_visible" @click="message.is_prompt_visible = false" v-tooltip aria-label="Hide prompt")
              i.eye.icon
            button(v-else @click="message.is_prompt_visible = true" v-tooltip aria-label="Show prompt")
              i.eye.slash.icon
          div.response.phrase(:class="{error: message.is_error}")
            b AI:
            span {{ chatbot.response_or_error(message) }}
            ClipboardButton(name="response" :text="chatbot.response_or_error(message)" compact)
          div.time
            i.time.icon
            | {{ format_datetime(message.timestamp_ms) }}
            i.hourglass.end.icon(style="margin-left: 10px")
            | {{ (message.duration_ms / 1000).toFixed(2) }}s
    div.shadow.top
    div.shadow.bottom

  div
    button.button(@click="regenerate_response" :class="{disabled: !chatbot.can_run}")
      i.sync.icon
      | Regenerate response
    button.button(@click="$router.push('/params')" :class="{disabled: !params.is_valid}")
      i.edit.outline.icon
      | Edit params
    button.button(
      :class="{disabled: !chatbot.google_translate_url}"
      @click="open_in_new_tab(chatbot.google_translate_url)"
    )
      i.language.icon
      | Not {{ params.target_language.value }} language? Use Google Translate

  div(style="height: 100px")
</template>

<style scoped lang="scss">
.cover-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  img {
    margin-top: 50px;
    margin-right: 14px;
    margin-bottom: -120px;
    width: 150px;
    display: block;

    z-index: -1;
  }
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
  box-sizing: border-box;

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

      color: var(--accent-color);

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
