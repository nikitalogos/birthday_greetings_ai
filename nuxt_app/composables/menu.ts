import { reactive, computed } from "vue";

export const menu = reactive({
  title: "Birthday Greetings AI",
  items: [
    {
      title: "API Token",
      path: "/api_token",
    },
    {
      title: "Params",
      path: "/params",
    },
    {
      title: "AI Response",
      path: "/ai_response",
    },
    {
      title: "About",
      path: "/about",
    },
  ],
});
