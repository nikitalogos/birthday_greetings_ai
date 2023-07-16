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
    };
  },
  methods: {
    date_format(date) {
      return date.toISOString().slice(0, 10);
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

<template>
  <div>
    <form>
      <div v-for="(group, idx) in params.groups" :key="idx">
        <h2>{{ group.label }}</h2>
        <div v-for="param in group.items" class="param">
          <label :for="param.label">{{ param.label }}</label>

          <VueDatePicker
            v-if="param.type === 'date'"
            v-model="param.value"
            :id="param.label"
            :flow="['year', 'month', 'calendar']"
            auto-apply
            :enable-time-picker="false"
            :format="date_format"
            dark
            text-input
            :text-input-options="{ format: 'yyyy-MM-dd' }"
            placeholder="Select date or type it in format YYYY-MM-DD"
          ></VueDatePicker>
          <span v-else-if="param.type === 'dynamic'" class="dynamic">
            <div class="value">{{ param.value ?? "?" }} {{ param.label === "Age" ? "years" : "" }}</div>
            <toggle v-model="param.hide" :id="param.label" onLabel="enabled" offLabel="hidden" />
            <div class="hint">{{ param.hide ? "(press to hide)" : "(press to enable)" }}</div>
          </span>
          <multiselect
            v-else-if="param.type === 'select'"
            v-model="param.value"
            :id="param.label"
            :options="param.options"
            placeholder="Select option or type your own variant"
            :searchable="true"
            :createOption="true"
          ></multiselect>
          <multiselect
            v-else-if="param.type === 'multiselect'"
            v-model="param.value"
            :id="param.label"
            :options="param.options"
            mode="tags"
            placeholder="Select or type your own wishes. Click on wish or press Enter to add it"
            :searchable="true"
            :createOption="true"
          ></multiselect>
          <toggle v-else-if="param.type === 'toggle'" v-model="param.value" onLabel="yes" offLabel="no" />
          <div v-else-if="param.type === 'textarea'" class="textarea-wrapper">
            <textarea
              :id="param.label"
              rows="10"
              :placeholder="`Type your ${param.label.toLowerCase()} here`"
              @input="limit_textarea_input($event, param)"
              :value="param.value"
            ></textarea>
            <div class="symbols-used">{{ param.max_length - (param.value?.length ?? 0) }} symbols left</div>
          </div>
          <input
            v-else
            :type="param.type"
            :id="param.label"
            v-model="param.value"
            :placeholder="`Type person's ${param.label.toLowerCase()}`"
          />
        </div>
      </div>
    </form>
    <pre>{{ JSON.stringify(params.values, null, 4) }}</pre>
  </div>
</template>

<style src="@vuepic/vue-datepicker/dist/main.css"></style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style lang="scss" src="@/assets/style/vue-datepicker.scss"></style>
<style lang="scss" src="@/assets/style/vueform-multiselect.scss"></style>
<style lang="scss" src="@/assets/style/vueform-toggle.scss"></style>

<style scoped lang="scss">
form {
  max-width: 600px;
  margin: 0 auto;

  .param {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    margin: 10px 0;
  }
  label {
    width: 150px;
  }
  .dynamic {
    display: flex;
    flex-direction: row;
    .value {
      width: 100px;
    }
    .toggle-container {
      margin: 0 15px;
    }
    .hint {
      color: var(--color-faded);
    }
  }
  .multiselect,
  .textarea-wrapper,
  input,
  .dp__main {
    width: calc(100% - 150px);
  }
  textarea {
    width: 100%;
  }
  input,
  textarea {
    box-sizing: border-box;
  }
  textarea {
    position: relative;
    .symbols-used {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 0.8em;
      color: #999;
    }
  }
  input,
  textarea {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 6px;
    background-color: var(--input-bg-color);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    &:hover {
      border-color: var(--border-color-active);
    }
  }
}
</style>
