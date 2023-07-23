<script>
import GithubButton from "vue-github-button";

export default defineNuxtComponent({
  components: {
    GithubButton,
  },
});
</script>

<template lang="pug">
div.wrapper
  h1 About #[i.birthday.cake.icon]
  p Made by #[a(href="https://logosnikita.com/about" target="_blank" rel="noopener") Nikita Logos]
  p #[i.linkify.icon] Website: #[a(href="https://logosnikita.com/" target="_blank" rel="noopener") logosnikita.com]
  p #[i.github.icon] Github: #[a(href="https://github.com/nikitalogos/birthday_greetings_ai" target="_blank" rel="noopener") birthday_greetings_ai]


  h3 Licences:
  p This app is licenced under #[a(href="https://github.com/nikitalogos/birthday_greetings_ai/blob/main/LICENCE" target="_blank" rel="noopener") MIT licence].
  p
    | It uses LLaMA 2 language model developed by Meta, which is licenced under
    a(href="https://ai.meta.com/resources/models-and-libraries/llama-downloads/" target="_blank" rel="noopener")
      |  Llama 2 Community License Agreement
  p
    | LLaMA 2 is served by #[a(href="https://replicate.com/" target="_blank" rel="noopener") Replicate]
    | under #[a(href="https://replicate.com/terms" target="_blank" rel="noopener") Replicate Terms of Use]


  h3 Support me:
  ul
    li.align-github-star
      span If you like this project, leave star on GitHub:
      github-button.gh(
        href="https://github.com/nikitalogos/birthday_greetings_ai"
        data-color-scheme="no-preference: dark; light: dark; dark: dark;"
        data-show-count="true"
        aria-label="Star nikitalogos/birthday_greetings_ai on GitHub"
      ) Star

</template>

<style scoped lang="scss">
.wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

h3 {
  margin-top: 50px;
}

.align-github-star {
  span {
    margin-right: 5px;
  }
  .gh {
    vertical-align: middle;
  }
}
</style>
