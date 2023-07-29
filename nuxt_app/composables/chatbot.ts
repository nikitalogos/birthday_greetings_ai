import { reactive, computed } from "vue";

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

const is_production = process.env.NODE_ENV === "production";
const backend_url = is_production
  ? "https://birthday-greetings-ai.fly.dev"
  : "http://" + window.location.hostname + ":8080";

export const chatbot = reactive({
  token: null,
  is_in_progress: false,

  chat_history: [
    //    {
    //      timestamp_ms: new Date().getTime(),
    //      duration_ms: 10.533 * 1000,
    //      prompt: "Hello, how are you?",
    //      response: "I'm fine, how are you?",
    //      is_error: false,
    //      error_str: "",
    //      completed: true,
    //    },
    //    {
    //      timestamp_ms: new Date().getTime(),
    //      duration_ms: 10.533 * 1000,
    //      prompt:
    //        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
    //      response:
    //        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
    //      is_error: false,
    //      error_str: "",
    //      completed: true,
    //    },
    //    {
    //      timestamp_ms: new Date().getTime(),
    //      duration_ms: 10.533 * 1000,
    //      prompt:
    //        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
    //      response:
    //        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
    //      is_error: false,
    //      error_str: "",
    //      completed: true,
    //    },
    //    {
    //      timestamp_ms: new Date().getTime(),
    //      duration_ms: 10.533 * 1000,
    //      prompt:
    //        "Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?",
    //      response:
    //        "I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?I'm fine, how are you?",
    //      is_error: false,
    //      error_str: "",
    //    },
    //    {
    //      timestamp_ms: new Date().getTime(),
    //      duration_ms: 10.533 * 1000,
    //      prompt: "Hello, how are you?",
    //      response: "",
    //      is_error: true,
    //      error_str: "Access denied",
    //      completed: true,
    //    },
  ],

  response_or_error(message) {
    if (!message.completed) {
      return "Waiting for response...";
    }
    if (message.is_error) {
      return `Error: ${message.error_str}`;
    }
    return message.response;
  },

  export_txt() {
    const data_str = this.chat_history
      .map((item) => {
        return (
          `~~~~~~~~~~~~~Prompt~~~~~~~~~~~~~\n\n${item.prompt}\n\n` +
          `~~~~~~~~~~~~~Response~~~~~~~~~~~~~\n\n${this.response_or_error(item)}`
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
    this.is_in_progress = true;
    try {
      const response = await fetch(backend_url + "/api/chatbot", {
        method: "POST",
        body: JSON.stringify({
          token: this.token,
          prompt,
        }),
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }
      return data.message;
    } finally {
      this.is_in_progress = false;
    }
  },

  async run() {
    const prompt = params.prompt;
    const start_time = Date.now();

    let response = "";
    let is_error = false;
    let error_str = "";

    const message = {
      timestamp_ms: start_time,
      prompt,
      // temporary values:
      duration_ms: 0,
      response,
      is_error,
      error_str,
      completed: false,
    };
    this.chat_history.push(message);

    try {
      response = await this.run_impl(prompt);
    } catch (error) {
      is_error = true;
      error_str = error.message;
    }
    const end_time = Date.now();

    message.duration_ms = end_time - start_time;
    message.response = response;
    message.is_error = is_error;
    message.error_str = error_str;
    message.completed = true;
    // trigger vue3 to update message
    this.chat_history.pop(message);
    this.chat_history.push(message);
  },
});

chatbot.can_run = computed(() => {
  return params.is_valid && chatbot.token && !chatbot.is_in_progress;
});
