<script>
import Multiselect from "@vueform/multiselect";
import Toggle from '@vueform/toggle'

export default defineNuxtComponent({
  components: {
    Multiselect,
    Toggle,
  },
  data() {
    return {
      params,
    };
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
      <div v-for="(group, idx) in params.groups()" :key="idx">
        <h2>{{ group.label }}</h2>
        <div v-for="param in group.items" class="param">
          <label :for="param.label">{{ param.label }}</label>

          <span v-if="param.type === 'dynamic'">
            {{ param.value }} (you can hide it)
            <input type="checkbox" :id="param.label" v-model="param.hide" />
          </span>
          <multiselect
            v-else-if="param.type === 'select'"
            v-model="param.value"
            :options="param.options"
            placeholder="Select option or type your own variant"
            :searchable="true"
            :createOption="true"
          ></multiselect>
          <multiselect
            v-else-if="param.type === 'multiselect'"
            v-model="param.value"
            :options="param.options"
            mode="tags"
            placeholder="Select or type your own wishes. Click on wish or press Enter to add it"
            :searchable="true"
            :createOption="true"
          ></multiselect>
          <toggle v-else-if="param.type === 'toggle'" v-model="param.value" />
          <input v-else :type="param.type" :id="param.label" v-model="param.value" />
        </div>
      </div>
    </form>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/toggle/themes/default.css"></style>

<style scoped lang="scss">
form {
  max-width: 600px;
  margin: 0 auto;

  .param {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;

    margin: 5px 0;

    label {
      width: 150px;

    }
    .multiselect {
      width: calc(100% - 150px);
    }
  }
}
</style>
