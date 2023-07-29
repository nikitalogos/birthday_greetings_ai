<script>
import GithubButton from "vue-github-button";

export default defineNuxtComponent({
  components: {
    GithubButton,
  },
});
</script>

<template lang="pug">
div.page-wrapper
  h1 About #[i.birthday.cake.icon]
  p #[i.user.circle.icon] Made by: #[a(href="https://logosnikita.com/about" target="_blank" rel="noopener") Nikita Logos]
  p #[i.linkify.icon] Website: #[a(href="https://logosnikita.com/" target="_blank" rel="noopener") logosnikita.com]
  p #[i.github.icon] Github: #[a(href="https://github.com/nikitalogos/birthday_greetings_ai" target="_blank" rel="noopener") birthday_greetings_ai]


  h2 Licences:
  p This app is licenced under #[a(href="https://github.com/nikitalogos/birthday_greetings_ai/blob/main/LICENCE" target="_blank" rel="noopener") MIT licence].
  p
    | It uses Llama 2 language model developed by Meta, which is licenced under
    a(href="https://ai.meta.com/resources/models-and-libraries/llama-downloads/" target="_blank" rel="noopener")
      |  Llama 2 Community License Agreement
  p
    | Llama 2 is served by #[a(href="https://replicate.com/" target="_blank" rel="noopener") Replicate.com]
    | under #[a(href="https://replicate.com/terms" target="_blank" rel="noopener") Replicate Terms of Use]
  p
    | Arts were generated via #[b Stable Diffusion XL] at #[a(href="https://clipdrop.co/stable-diffusion" target="_blank" rel="noopener") Clipdrop.co]


  h2 Support me:
  p.github-star
    span If you like this project, leave star on GitHub:
    github-button.gh(
      href="https://github.com/nikitalogos/birthday_greetings_ai"
      data-color-scheme="no-preference: dark; light: dark; dark: dark;"
      data-show-count="true"
      aria-label="Star nikitalogos/birthday_greetings_ai on GitHub"
    ) Star

  div.cover-wrapper
    img(src="/images/old_lady.png" alt="Robot gives a present to an old lady")

</template>

<style scoped lang="scss">
h2 {
  margin-top: 50px;
}

.github-star {
  span {
    margin-right: 5px;
  }
  .gh {
    vertical-align: middle;
  }
}

.cover-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 65%;
    display: block;
  }
}
</style>
