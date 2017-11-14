<template>
  <div class="cs-search">
    <form v-on:submit.prevent="search">
     <v-input
        class="cs-search_sport"
        id="sport"
        :value="sport"
        name="sport"
        type="text"
        :placeholder="$t('inputs.sport')"
      />
      <v-select
        v-bind:items="sports"
        v-model="sport"
        label="Select"
        autocomplete
      ></v-select>
      <v-input
        class="cs-search_date"
        id="date"
        :value="city"
        name="date"
        type="date"
        :placeholder="$t('inputs.date')"
      />
      <button class="cta cta-search" type="button">
        {{ $t('buttons.search') }}
      </button>
    </form>
  </div>
</template>

<script>
import vInput from '~/components/Input.vue'
export default {
  components: {
    vInput
  },
  props: ['sports'],
  data: () => ({
    users: [],
    form: 'search',
    menu: false,
    modal: false
  }),
  computed: {
    sport () {
      return this.$store.state.forms.search.sport
    },
    city () {
      return this.$store.state.forms.search.city
    },
    date () {
      return this.$store.state.forms.search.date
    }
  },
  methods: {
    updateField (field, value) {
      this.$store.commit('forms/updateField', { form: this.form, field, value })
    }
  }
}
</script>

<style lang="scss" scoped>
.cs-search {
  background: #fff;
  opacity: .97;
  padding: 16px;
  margin-top: 20px;
  width: 90%;
  margin: 0 auto;  
}
.cta {
  width: 26%;
  margin-left: 8px;
  height: 45px;
  background: #41b883;
  color: #fff;
  text-transform: uppercase;
  border: none;
  letter-spacing: 1px;  
}

</style>

