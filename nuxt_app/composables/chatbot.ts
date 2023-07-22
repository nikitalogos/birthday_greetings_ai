import { reactive, computed } from "vue";

export const chatbot = reactive({
  token: null,
});

chatbot.run = async (user_prompt) => {
  const response = await fetch("http://localhost:8080/api/chatbot", {
    method: "POST",
    body: JSON.stringify({
      token: chatbot.token,
      user_prompt,
    }),
  });
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }
  return data.message;
};
