<script>
export default defineNuxtComponent({});
</script>

<template lang="pug">
div.wrapper
  h1 About #[i.birthday.cake.icon]
  p Made by #[a(href="https://logosnikita.com/about" target="_blank" rel="noopener") Nikita Logos]
  p #[i.globe.icon] Website: #[a(href="https://logosnikita.com/" target="_blank" rel="noopener") logosnikita.com]
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
      iframe(
        src="https://ghbtns.com/github-btn.html?user=nikitalogos&repo=birthday_greetings_ai&type=star&count=true"
        frameborder="0" scrolling="0" width="150" height="20" title="GitHub"
      )
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
  iframe {
    vertical-align: middle;
    margin-top: -1px;
  }
}
</style>
