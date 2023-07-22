import { reactive, computed } from "vue";

import { api_token } from "./api_token";

export const chatbot = reactive({
  async run(user_prompt) {
    const response = await fetch("http://localhost:8080/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        token: api_token.token,
        user_prompt,
      }),
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }
    return data.message;
  },
});
