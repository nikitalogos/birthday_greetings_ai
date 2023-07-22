<script>
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: "Nikita Logos",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }, // for mobile browsers
        {
          name: "darkreader",
          content: "This notifies dark reader to not to darken this site",
        },
      ],
      link: [{ rel: "icon", href: "/birthday_greetings_ai/favicon.png" }],
      htmlAttrs: {
        lang: "en", // default language
      },
    };
  },
});
</script>

<template>
  <NuxtPage />
</template>

<style lang="scss" src="assets/style/app.scss"></style>

<style src="@/assets/fonts/semantic-ui-icon/icon.css"></style>

<style lang="scss" scoped></style>
