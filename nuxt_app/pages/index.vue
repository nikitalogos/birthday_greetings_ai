<script>
export default defineNuxtComponent({
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
        <div v-for="param in group.items">
          <label :for="param.name">{{ param.label }}</label>
          <input type="param.type" :id="param.name" v-model="param.value" />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>
