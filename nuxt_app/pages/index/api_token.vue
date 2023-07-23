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
          this.$router.push("/params");
        }, 1000);
      } catch (error) {
        this.is_error = true;
        this.result_str = error.message;
      }

      this.is_in_progress = false;
    },
    go_to_replicate() {
      window.open("https://replicate.com/account/api-tokens", "_blank", "noopener");
    },
  },
});
</script>

<template lang="pug">
div.page-wrapper
  h1 Get API Token
  div.description
    | This app uses #[a(href="https://replicate.com/" target="_blank" rel="noopener") Replicate] as a backend.
    | <br/>To proceed, you need to obtain API token from it.
    | <br/>We don't store your token: it will be deleted if you leave page or refresh it.
  form
    div.param
      label(for="url") Get token
      button.button.go-to-replicate(@click.prevent="go_to_replicate")
          | Go to Replicate.com
          i.external.alternate.icon(style="margin-left: 10px")
    div.param
      label(for="token") Token
      input(:type="is_token_visible ? 'text' : 'password'" id="token" v-model="chatbot.token")
      button.show-token(v-if="is_token_visible" v-tooltip aria-label="Hide token" @click="is_token_visible = false")
        i.white.eye.icon
      button.show-token(v-else v-tooltip aria-label="Show token" @click="is_token_visible = true")
        i.white.eye.slash.icon
      button.button(:class="{ disabled: !chatbot.token || is_in_progress }" type="submit" @click.prevent="submit_token")
        | Next
        i.white.arrow.right.icon(style="margin-left: 5px")

  div.loading(v-if="is_in_progress")
    div.ui.active.inline.loader
    div(style="color: var(--accent-color);") Your token is being checked, please wait...
  div.result(v-if="result_str" :class="{ error: is_error }") {{ result_str }}
</template>

<style scoped lang="scss">
.description,
result {
  white-space: pre-wrap;
}
.result {
  color: var(--accent-color);
  &.error {
    color: var(--error-color);
  }
}

form {
  label {
    width: 100px;
  }
  .button.go-to-replicate {
    width: calc(100% - 100px);
  }
  input {
    width: calc(100% - 250px);
  }
  button.show-token {
    width: 50px;
  }
  button {
    width: 100px;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;

  div:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
