<script>
export default defineNuxtComponent({
  data() {
    return {
      api_token,
      chatbot,

      is_token_visible: false,

      is_error: false,
      result_str: "",
    };
  },
  methods: {
    async submit_token() {
      // check token
      try {
        await this.chatbot.run_impl("Say hello");
        this.is_error = false;
        this.result_str = "Token is valid!";

        setTimeout(() => {
          this.$router.push("/form");
        }, 1000);
      } catch (error) {
        this.is_error = true;
        this.result_str = error.message;
      }
    },
  },
});
</script>

<template lang="pug">
div.wrapper
  h1 Get API Token
  div.description
    | This app uses #[a(href="https://replicate.com/" target="_blank" rel="noopener") Replicate] as a backend.
    | <br/>To proceed, you need to obtain API token from it.
    | <br/>We don't store your token: it will be deleted if you leave page or refresh it.
  form
    div.param
      label(for="url") Replicate URL
      button.button
        a(href="https://replicate.com/" target="_blank" rel="noopener")
          | Go to Replicate.com
          i.external.alternate.icon
    div.param
      label(for="token") Token
      input(:type="is_token_visible ? 'text' : 'password'" id="token" v-model="api_token.token")
      button.show-token(v-if="is_token_visible" v-tooltip aria-label="Hide token" @click="is_token_visible = false")
        i.white.eye.icon
      button.show-token(v-else v-tooltip aria-label="Show token" @click="is_token_visible = true")
        i.white.eye.slash.icon
      button.button(:class="{ disabled: !api_token.token }" type="submit" @click.prevent="submit_token")
        | Next
        i.white.arrow.right.icon

  div.result(v-if="result_str" :class="{ error: is_error }") {{ result_str }}
</template>

<style scoped lang="scss">
.wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

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
  input {
    width: calc(100% - 200px);
  }
  button {
    width: 100px;
  }
}
</style>
