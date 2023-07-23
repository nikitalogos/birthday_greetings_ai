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

<template>
  <div class="wrapper">
    <h1>Get API Token</h1>
    <div class="description">{{ api_token.description }}</div>
    <form>
      <div class="param">
        <label for="token">Token</label>
        <input :type="is_token_visible ? 'text' : 'password'" id="token" v-model="api_token.token" />

        <button v-if="is_token_visible" class="show-token" v-tooltip aria-label="Hide token" @click="is_token_visible = false">
          <i class="white eye icon"></i>
        </button>
        <button v-else class="show-token" v-tooltip aria-label="Show token" @click="is_token_visible = true">
          <i class="white eye slash icon"></i>
        </button>

        <button class="button" :class="{ disabled: !api_token.token }" type="submit" @click.prevent="submit_token">
          Next <i class="white arrow right icon"></i>
        </button>
      </div>
    </form>
    <div v-if="result_str" class="result" :class="{ error: is_error }">{{ result_str }}</div>
  </div>
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
