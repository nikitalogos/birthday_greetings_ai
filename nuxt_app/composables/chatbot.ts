import { reactive, computed } from "vue";

import { api_token } from "./api_token";
import { params } from "./params";

function export_file(name, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", name);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export const chatbot = reactive({
  chat_history: [
    {
      timestamp_ms: new Date().getTime(),
      duration_ms: 10.533 * 1000,
      prompt: "Hello, how are you?",
      response: "I'm fine, how are you?",
      is_error: false,
      error_str: "",
    },
    {
      timestamp_ms: new Date().getTime(),
      duration_ms: 10.533 * 1000,
      prompt:
        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
      response:
        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
      is_error: false,
      error_str: "",
    },
    {
      timestamp_ms: new Date().getTime(),
      duration_ms: 10.533 * 1000,
      prompt:
        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
      response:
        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
      is_error: false,
      error_str: "",
    },
    {
      timestamp_ms: new Date().getTime(),
      duration_ms: 10.533 * 1000,
      prompt:
        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
      response:
        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
      is_error: false,
      error_str: "",
    },
    {
      timestamp_ms: new Date().getTime(),
      duration_ms: 10.533 * 1000,
      prompt: "Hello, how are you?",
      response: "",
      is_error: true,
      error_str: "Access denied",
    },
  ],

  export_txt() {
    const data_str = this.chat_history
      .map((item) => {
        return (
          `~~~~~~~~~~~~~Prompt~~~~~~~~~~~~~\n\n${item.prompt}\n\n` +
          `~~~~~~~~~~~~~Response~~~~~~~~~~~~~\n\n${item.response}`
        );
      })
      .join("\n\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n\n");

    export_file("birthday_greetings_ai_session.txt", data_str);
  },

  export_json() {
    const data_str = JSON.stringify({ chat_history: this.chat_history }, null, 4);
    export_file("birthday_greetings_ai_session.json", data_str);
  },

  async run_impl(prompt) {
    const response = await fetch("http://localhost:8080/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        token: api_token.token,
        prompt,
      }),
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }
    return data.message;
  },

  async run() {
    const prompt = params.prompt;

    const is_error = false;
    let error_str = "";
    let response = "";
    const start_time = Date.now();
    try {
      response = await this.run_impl(prompt);
    } catch (error) {
      is_error = true;
      error_str = error.message;
    }
    const end_time = Date.now();

    const message = {
      timestamp_ms: end_time.getTime(),
      duration_ms: end_time - start_time,
      prompt,
      response,
      is_error,
      error_str,
    };
    this.chat_history.push(message);
  },
});
