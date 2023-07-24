<script>
export default defineNuxtComponent({
  head(nuxtApp) {
    return {
      title: "Birthday Greetings AI",
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
<style lang="scss" src="@/assets/style/params.scss"></style>
<style lang="scss" src="assets/style/tooltip.scss"></style>

<style src="@/assets/fonts/semantic-ui-icon/icon.css"></style>
<style src="public/semantic-ui/components/loader.min.css"></style>
<style lang="scss" src="assets/style/semantic-ui-overrides.scss"></style>

<style lang="scss" scoped></style>
