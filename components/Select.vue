<template>
  <label class="cs-input-label">
    <span v-if="label">{{ label }}</span>
    <select
      class="cs-select"
      :id="id"
      :value="value"
      @input="changeHandler(name, $event.target.value)"
      :placeholder="placeholder"
    >
      <option
        v-for="value in values"
        :key="value.value"
      >
        {{ value.label }}
      </option>
    </select>
  </label>
</template>

<script>
  export default {
    name: 'v-input',
    props: ['value', 'values', 'changeHandler', 'placeholder', 'label', 'name', 'id']
  }
</script>

<style lang="scss">
  .cs-input-label {
    display: inline-block;
    padding: 0 8px;
    width: 28%;
    &:first-child{
      padding-left: 0;
    }
  }
  .cs-search_date{
    width: 17%;
  }
   .cs-input {
      text-align: left;
      height: 45px;
      width: 100%;
      padding: 0 10px;
      font-size: 13px;
      text-transform: uppercase;
      border: 1px solid #d3d3d3;      
    }
    
</style>