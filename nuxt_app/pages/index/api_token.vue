<script>
export default defineNuxtComponent({
  data() {
    return {
      chatbot,

      is_token_visible: false,
      is_in_progress: false,

      is_error: false,
      result_str: "",
    };
  },
  methods: {
    async submit_token() {
      // check token
      try {
        this.is_in_progress = true;
        this.is_error = false;
        this.result_str = "";

        await this.chatbot.run_impl("Say hello");

        this.is_error = false;
        this.result_str = "Token is valid!";

        setTimeout(() => {
          this.is_in_progress = false;
          this.$router.push("/params");
        }, 1000);
      } catch (error) {
        this.is_in_progress = false;
        this.is_error = true;
        this.result_str = error.message;
      }
    },
    go_to_replicate() {
      window.open("https://replicate.com/account/api-tokens", "_blank", "noopener");
    },
  },
});
</script>

<template lang="pug">
div.page-wrapper
  div.cover-wrapper
    img(src="/images/copter.png" alt="Copter delivers a present")
  h1 Get API Token
  div.motivation
    | It's free and will take a moment!
    | You need to login via GitHub :)
  form
    div.param
      label(for="url") Get token
      button.button.go-to-replicate(@click.prevent="go_to_replicate")
          | Go to Replicate.com
          i.external.alternate.icon(style="margin-left: 10px")
    div.param.good-wrap
      label(for="token") Token
      div.input-wrapper
        input(:type="is_token_visible ? 'text' : 'password'" id="token" v-model="chatbot.token" placeholder="Paste token here")
        button.show-token(v-if="is_token_visible" v-tooltip aria-label="Hide token" @click="is_token_visible = false")
          i.white.eye.icon
        button.show-token(v-else v-tooltip aria-label="Show token" @click="is_token_visible = true")
          i.white.eye.slash.icon
      button.button.next(:class="{ disabled: !chatbot.token || is_in_progress }" type="submit" @click.prevent="submit_token")
        | Next
        i.arrow.right.icon(style="margin-left: 5px")

  div.loading(v-if="is_in_progress")
    div.ui.active.inline.loader
    div(style="color: var(--accent-color);") Your token is being checked, please wait...
  div.result(v-if="result_str" :class="{ error: is_error }") {{ result_str }}

  InfoBox
    | This app uses #[a(href="https://replicate.com/" target="_blank" rel="noopener") Replicate]
    | as a backend for Llama 2 model.
    | <br/>{{ prevent_short_word_hangs("To proceed, you need to obtain API token from it.") }}
    | <br/>{{ prevent_short_word_hangs("We don't store your token: it will be deleted if you leave page or refresh it.") }}

  div
    | You can
    button.button.compact(@click="$router.push('/params')")
      | Skip
      i.angle.double.right.icon(style="margin-left: 5px")
    | this step
    | and copy prompt for your favourite chatbot on the #[nuxt-link(to="/params") next step].
</template>

<style scoped lang="scss">
.cover-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 50px;
    width: 70%;
    display: block;
  }
}

.motivation {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;

  white-space: pre-line;

  color: var(--accent-color);
}

form {
  label {
    width: 100px;
  }
  .button.go-to-replicate {
    width: calc(100% - 100px);
  }
  .input-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: calc(100% - 200px);
    min-width: 350px;

    input {
      width: calc(100% - 50px);
    }
    button.show-token {
      width: 50px;
    }
  }
  button.next {
    width: 100px;
    margin: 0;
  }
  .good-wrap {
    & > button.next,
    & > * {
      margin-bottom: 10px;
    }
  }
}

.loading,
.result {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid;
  border-radius: 5px;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;

  border-color: var(--border-color);

  div:not(:last-child) {
    margin-bottom: 10px;
  }
}
.result {
  white-space: pre-line;

  color: var(--accent-color);
  &.error {
    color: var(--error-color);
  }
}
</style>
