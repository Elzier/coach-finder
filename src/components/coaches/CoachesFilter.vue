<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <label for="frontend">frontend</label>
      <input id="frontend" type="checkbox" @change="changeFilterParams" checked>
    </span>
    <span class="filter-option">
      <label for="backend">backend</label>
      <input id="backend" type="checkbox" @change="changeFilterParams" checked>
    </span>
    <span class="filter-option">
      <label for="career">career</label>
      <input id="career" type="checkbox" @change="changeFilterParams" checked>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filterParams: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  methods: {
    changeFilterParams(event) {
      const paramId = event.target.id
      const isActive = event.target.checked
      const newFilterParams = {
        ...this.filterParams,
        [paramId]: isActive
      }
      this.filterParams = newFilterParams
      this.$emit('filter-params', this.filterParams)
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>