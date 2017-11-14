<template>
  <div>
    <div id="content" class="content-top">
        <div class="wrapper-content-slider">
          <div class="content-slider">
            <div class="cs-title">
              <h1>Site de rencontre pour les sportifs</h1>
                <span>Trouver un partenaire pour une séance de sport à côté de chez vous</span>
            </div>
            <SearchComponent />
          </div> 
        </div>
        <img class="slider" src="~/assets/images/slide1.jpg">
    </div>
  </div>
</template>

<script>
import SearchComponent from '~/components/Search.vue'

export default {
  components: {
    SearchComponent
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  data: () => ({
    sports: []
  }),
  methods: {
    refreshAnnonces: function (e) {
      this.$axios.get('annonces').then(res => {
        this.annonces = res.data
      })
    }
  },
  asyncData (context) {
    return context.app.$axios.get('sports').then(res => (
      { sports: res.data }
    ))
  }
}
</script>

<style>

</style>
