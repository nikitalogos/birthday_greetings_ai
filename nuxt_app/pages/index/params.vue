<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import Multiselect from "@vueform/multiselect";
import Toggle from "@vueform/toggle";

export default defineNuxtComponent({
  components: {
    VueDatePicker,
    Multiselect,
    Toggle,
  },
  data() {
    return {
      params,
      chatbot,
    };
  },
  methods: {
    limit_textarea_input(event, param) {
      const value = event.target.value.slice(0, param.max_length);
      param.value = value;
      event.target.value = value; // to update textarea, because :value="param.value" doesn't work
    },
    create_greeting() {
      this.chatbot.run();

      setTimeout(() => {
        this.$router.push("/ai_response");
      }, 100);
    },
  },
});
</script>

<template lang="pug">
div.page-wrapper
  h1 Params
  div.motivation
    div Let's create a portrait of the person you want to congratulate
  form
    div.group(v-for="(group, idx) in params.groups" :key="idx")
      div(v-if="!group.advanced || params.is_advanced_mode")
        div.sep-line(v-if="idx > 0")
        div.group-label(v-if="!!group.label") {{ group.label }}
        div.param(v-for="param in group.items")
          label {{ param.label + (param.required ? '*' : '') }}

          //- can use :flow="['year', 'month', 'calendar']" since v6.0.0.
          // But it adds page reload after pressing enter, so we need @keydown.enter.prevent
          // top and bottom buttons also cause page reload, so we need to hide them (see forms.scss)
          div.date-wrapper(v-if="param.type === 'date'")
            VueDatePicker.date(
              v-model="param.value"
              :id="param.label"
              auto-apply
              :enable-time-picker="false"
              format="yyyy-MM-dd"
              dark
              text-input
              :text-input-options="{ format: 'yyyy-MM-dd' }"
              placeholder="Select date or type it in format YYYY-MM-DD"
              :flow="['year', 'month', 'calendar']"
              @keydown.enter.prevent
            )
            span.computed(v-if="!!params.date_of_birth.value")
              span(:class="{hidden: !params.use_age.value}") {{ params.age }} years old,
              |  
              span(:class="{hidden: !params.use_zodiac_sign.value}") {{ params.zodiac_sign }}
          div.multi-select-wrapper(v-else-if="param.type === 'select'")
            multiselect(
              v-model="param.value"
              :id="param.label"
              :options="param.options"
              placeholder="Select option or type your own variant"
              :searchable="true"
              :createOption="true"
              :canClear="!param.required"
              :canDeselect="!param.required"
            )
          div.multi-select-wrapper(v-else-if="param.type === 'multiselect'")
            multiselect(
              v-model="param.value"
              :id="param.label"
              :options="param.options"
              mode="tags"
              placeholder="Select or type your own wishes"
              :searchable="true"
              :createOption="true"
              :canClear="false"
            )
            div.hint (Click on wish or press Enter to add it)
          span.toggle-wrapper(v-else-if="param.type === 'toggle'")
            span.toggle-wrapper-inner
              toggle(v-model="param.value" :id="param.label" onLabel="yes" offLabel="no")
            div.hint(v-if="!!param.hint" v-html="param.hint")
          div.textarea-wrapper(v-else-if="param.type === 'textarea'")
            textarea(
              :id="param.label"
              rows="10"
              :placeholder="`Type your ${param.label.toLowerCase()} here`"
              @input="limit_textarea_input($event, param)"
              :value="param.value"
            )
            div.symbols-used {{ param.max_length - (param.value?.length ?? 0) }} symbols left
          input(
            v-else
            :type="param.type"
            :id="param.label"
            v-model="param.value"
            :placeholder="`Type person's ${param.label.toLowerCase()}` + (param.required ? `. ${param.label} is required` : '')"
            :class="{required: param.required}"
          )

    div.param
      div.sep-line
      label.accent(for="advanced_mode_toggle") Advanced mode
      span.toggle-wrapper
        span.toggle-wrapper-inner
          toggle(v-model="params.is_advanced_mode" id="advanced_mode_toggle" onLabel="on" offLabel="off")
        div.hint {{ params.is_advanced_mode ? "(all params visible)" : "(basic params visible)" }}

  div.prompt-wrapper(v-if="params.is_valid")
    div.sep-line
    div.title Prompt for AI model:
      ClipboardButton(name="prompt" :text="params.prompt" compact accent popup_right style="margin-left: 10px")
    div.text "{{ params.prompt }}"

  //pre {{ params.values }}

  div.sep-line
  div.buttons-wrapper
    div.need-token(v-if="!chatbot.token")
      | Need token to create!
      nuxt-link(to="/api_token" style="color: var(--accent-color)")  Get token
    button.button.create(:class="{disabled: !chatbot.can_run}" @click="create_greeting")
      div.inside
        | Create greeting!
        i.magic.icon(style="margin-left: 5px")
    div.hint(:style="{opacity: params.is_valid ? '1' : '0.2'}") or you can just
    ClipboardButton.copy(name="prompt" popup_right :text="params.prompt" :class="{disabled: !params.is_valid}")

  div.cover-wrapper
    div(style="flex: 1")
    img(src="/images/girl.png" alt="A teenager girl with a present")

  div(style="margin-bottom: 50px;")
    | Here are some AI models to paste your prompt into:<br>
    div.buttons
      a.button.compact(href="https://chat.openai.com/" target="_blank" rel="noopener") ChatGPT
      a.button.compact(href="https://chat.claudeai.ai" target="_blank" rel="noopener") Claude 2
      a.button.compact(href="https://huggingface.co/spaces/ysharma/Explore_llamav2_with_TGI" target="_blank" rel="noopener") Llama 2 (current)

</template>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style lang="scss" src="@/assets/style/vue-datepicker.scss"></style>
<style lang="scss" src="@/assets/style/vueform-multiselect.scss"></style>
<style lang="scss" src="@/assets/style/vueform-toggle.scss"></style>

<style scoped lang="scss">
.motivation {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0 20px;

  white-space: pre-line;

  color: var(--accent-color);
}

.prompt-wrapper {
  color: var(--accent-color);

  .title {
    font-weight: bold;
  }
  .text {
    font-style: italic;
    white-space: pre-line;

    margin: 10px;
    padding-left: 20px;
    border-left: 3px solid var(--accent-color);
  }
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  align-items: left;

  button.button {
    width: fit-content;
    margin-left: 0;

    color: var(--bg-color);
    &:not(.disabled) {
      opacity: 0.9;
      &:hover {
        opacity: 1;
      }
    }

    &.create {
      font-size: 1.4rem;
      border-color: var(--accent-color);

      border-radius: 6px;
      padding: 2px;
      .inside {
        border-radius: 4px;
        padding: 0.5rem;

        background-color: var(--accent-color);
      }
    }
    &.copy {
      border: none;
      background-color: var(--white-color);
      font-size: 0.9rem;
    }
  }
  .hint {
    font-size: 0.8rem;
    font-weight: bold;
    margin: 10px 0;
  }
}

.cover-wrapper {
  display: flex;
  flex-direction: row;

  img {
    margin-top: -150px;
    width: 210px;
    display: block;

    z-index: -1;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: left;

  margin: 15px 0 15px -8px;
}
</style>
