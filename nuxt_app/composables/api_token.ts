import { reactive, computed } from "vue";

export const api_token = reactive({
  description:
    "This app uses Replicate as a backend.\n" +
    "To proceed, you need to obtain API token from it.\n" +
    "We don't store your token: it will be deleted if you leave page or refresh it.",

  token: null,
});
