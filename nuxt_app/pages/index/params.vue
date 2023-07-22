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

<template>
  <div class="wrapper">
    <h1>Params</h1>
    <form>
      <div v-for="(group, idx) in params.groups" :key="idx">
        <h2>{{ group.label }}</h2>
        <div v-for="param in group.items" class="param">
          <label v-if="group.label !== 'Comment'" :for="param.label">{{ param.label }}</label>

          <!-- can't use :flow="['year', 'month', 'calendar']" because of a bug. But maybe it will be fixed soon... todo: watch this-->
          <VueDatePicker
            v-if="param.type === 'date'"
            v-model="param.value"
            :id="param.label"
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
            <toggle v-model="param.show" :id="param.label" onLabel="enabled" offLabel="hidden" />
            <div class="hint">{{ param.show ? "(press to hide)" : "(press to enable)" }}</div>
          </span>
          <div v-else-if="param.type === 'select'" class="multi-select-wrapper">
            <multiselect
              v-model="param.value"
              :id="param.label"
              :options="param.options"
              placeholder="Select option or type your own variant"
              :searchable="true"
              :createOption="true"
            ></multiselect>
          </div>
          <div v-else-if="param.type === 'multiselect'" class="multi-select-wrapper">
            <div class="hint">(Click on wish or press Enter to add it)</div>
            <multiselect
              v-model="param.value"
              :id="param.label"
              :options="param.options"
              mode="tags"
              placeholder="Select or type your own wishes"
              :searchable="true"
              :createOption="true"
            ></multiselect>
          </div>
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

<style lang="scss" src="@/assets/style/form.scss"></style>

<style scoped lang="scss">
.wrapper {
  max-width: var(--page-max-width);
  margin: 0 auto;
}
</style>
