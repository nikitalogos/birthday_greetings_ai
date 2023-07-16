// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // Disable Server Side rendering

  // setup for Github Pages
  target: "static",
  app: {
    baseURL: "/birthday_greetings_ai/",

    // fixed by .nojekyll file at root of repo:
    //"buildAssetsDir": "/nuxt/", // default is /_nuxt/ which is ignored by Github Pages
  },

  telemetry: false, // disable nuxt telemetry

  devtools: { enabled: true },

  // for vuepic/vue-datepicker
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
