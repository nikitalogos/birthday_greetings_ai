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

      is_advanced_mode: false,
    };
  },
  methods: {
    date_format(date) {
      var dd = String(date.getDate()).padStart(2, "0");
      var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = date.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    limit_textarea_input(event, param) {
      const value = event.target.value.slice(0, param.max_length);
      param.value = value;
      event.target.value = value; // to update textarea, because :value="param.value" doesn't work
    },
  },
  created() {
    // init params from query string
    const date_str = this.$route.query.date_of_birth ?? "";
    this.params.date_of_birth.value = isNaN(Date.parse(date_str)) ? null : new Date(date_str);
    this.params.name.value = this.$route.query.name ?? null;
  },
});
</script>

<template lang="pug">
div.page-wrapper
  h1 Params
  form
    div.group(v-for="(group, idx) in params.groups" :key="idx")
      div(v-if="!group.advanced || is_advanced_mode")
        div.sep-line(v-if="idx > 0")
        div.group-label(v-if="!!group.label") {{ group.label }}
        div.param(v-for="param in group.items")
          label {{ param.label + (param.required ? '*' : '') }}

          //- can't use :flow="['year', 'month', 'calendar']" because of a bug. But maybe it will be fixed soon... todo: watch this
          div.date-wrapper(v-if="param.type === 'date'")
            VueDatePicker.date(
              v-model="param.value"
              :id="param.label"
              auto-apply
              :enable-time-picker="false"
              :format="date_format"
              dark
              text-input
              :text-input-options="{ format: 'yyyy-MM-dd' }"
              placeholder="Select date or type it in format YYYY-MM-DD"
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
            div.hint (Click on wish or press Enter to add it)
            multiselect(
              v-model="param.value"
              :id="param.label"
              :options="param.options"
              mode="tags"
              placeholder="Select or type your own wishes"
              :searchable="true"
              :createOption="true"
            )
          span.toggle-wrapper(v-else-if="param.type === 'toggle'")
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
        toggle(v-model="is_advanced_mode" id="advanced_mode_toggle" onLabel="on" offLabel="off")
        div.hint {{ is_advanced_mode ? "(all params visible)" : "(basic params visible)" }}

  div.prompt-wrapper(v-if="is_advanced_mode")
    div.sep-line
    div.title Prompt for AI model:
      ClipboardButton(name="prompt" :text="params.prompt" accent style="margin-left: 10px")
    div.text "{{ params.prompt }}"

  //pre {{ params.values }}

  div.sep-line
  button.button.create(:class="{disabled: !params.is_valid}")
    | Create greeting!
    i.magic.icon(style="margin-left: 5px")

  div.cover-wrapper
    div(style="flex: 1")
    img(src="images/girl.png" alt="A teenager girl with a present")
</template>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style lang="scss" src="@/assets/style/vue-datepicker.scss"></style>
<style lang="scss" src="@/assets/style/vueform-multiselect.scss"></style>
<style lang="scss" src="@/assets/style/vueform-toggle.scss"></style>

<style scoped lang="scss">
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

button.button.create {
  font-size: 1.2rem;
  margin-left: 0;
}

.cover-wrapper {
  display: flex;
  flex-direction: row;

  img {
    margin-top: -60px;
    width: 210px;
    display: block;
  }
}
</style>
