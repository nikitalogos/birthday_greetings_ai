import { reactive, computed } from "vue";

export const menu = reactive({
  title: "Birthday Greetings AI",
  items: [
    {
      title: "API Token",
      id: "api_token",
      path: "/api_token",
    },
    {
      title: "Form",
      id: "form",
      path: "/form",
    },
    {
      title: "AI Response",
      id: "ai_response",
      path: "/ai_response",
    },
    {
      title: "About",
      id: "about",
      path: "/about",
    },
  ],
});
