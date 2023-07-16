<script>
import Multiselect from '@vueform/multiselect'

export default defineNuxtComponent({
  components: {
    Multiselect,
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

    console.log(this.params.groups());
  },
});
</script>

<template>
  <div>
    <form>
      <div v-for="(group, idx) in params.groups()" :key="idx">
        <h2>{{ group.label }}</h2>
        <div v-for="param in group.items">
          <label :for="param.label">{{ param.label }}</label>

          <span v-if="param.type === 'dynamic'">
            {{ param.value }} (you can hide it)
            <input type="checkbox" :id="param.label" v-model="param.hide" />
          </span>
          <multiselect
            v-if="param.type === 'multiselect'"
            v-model="param.value"
            :options="param.options"
            mode="tags"
            placeholder="Select or type your own wishes. Click on wish or press Enter to add it"
            :searchable="true"
            :createOption="true"
          ></multiselect>
          <input v-else type="param.type" :id="param.label" v-model="param.value" />
        </div>
      </div>
    </form>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped lang="scss"></style>
