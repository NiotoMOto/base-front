<template>  
  <div>
    <header class="bloc-head">
      <ul class="menu menu-left">      
        <li class="menu-items burguer-menu"><i class="cs-font cs-font-burger"></i>Menu</li>
          
        <li class="menu-items cs-logo">            
          <a class="logo link" href="#" alt="logo"></a>
        </li>            
      </ul>
      <ul class="menu menu-right">
        <li class="menu-items menu-item-login">
          <a
            v-if="!user"
            href="#"
            v-on:click="toggleLoginModal">
              {{ $t('links.login') }} / create account
          </a>
          <nuxt-link
            v-if="user"
            :to="path('/profile')">
            {{ user.username }}
          </nuxt-link>
          <a 
            v-if="user"
            href="#"
            v-on:click="logout"
          >
            Déconnecter
          </a>
        </li>      
        <li class="menu-items menu-item-create-annonce">
          <nuxt-link :to="path('/annonces/create')">{{ $t('links.create_annonce') }}</nuxt-link>
        </li>         
      </ul>    
    </header>

    <div id="content" class="content-bottom">
      <!-- <p><nuxt-link :to="path('/')">{{ $t('links.home') }}</nuxt-link></p>
      <p><nuxt-link :to="path('/annonces/create')">{{ $t('links.create_annonce') }}</nuxt-link></p>
      <p><a href="#" v-on:click="toggleLoginModal">{{ $t('links.login') }}</a></p>
      <p><a href="#" v-on:click="toggleRegisterModal">{{ $t('links.register') }}</a></p>
      <p><a href="#" v-on:click="logout">{{ $t('links.logout') }}</a></p>
      <nuxt-link class="Header__Link" v-if="$i18n.locale === 'en'" :to="`/fr` + $route.fullPath" active-class="none" exact>
        {{ $t('links.french') }}
      </nuxt-link>
      <nuxt-link class="Header__Link" v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')" active-class="none" exact>
        {{ $t('links.english') }}
      </nuxt-link> -->
      <Modal :show="showLoginModal" :toggleModal="toggleLoginModal">
        <LoginOrRegister />
      </Modal>
    </div>
    <nuxt/>
  </div>
</template>

<script>
  import LoginOrRegister from '~/components/LoginOrRegister.vue'
  import Logo from '~/components/Logo.vue'
  import Modal from '~/components/Modal.vue'

  export default {
    components: {
      LoginOrRegister, Logo, Modal
    },
    computed: {
      showLoginModal () {
        return this.$store.state.ui.modals.login
      },
      showRegisterModal () {
        return this.$store.state.ui.modals.register
      },
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
      },
      path (url) {
        return this.$i18n.locale === 'en' ? url : '/' + this.$i18n.locale + url
      },
      toggleLoginModal () {
        this.$store.commit('ui/toggleModal', { modal: 'login' })
      },
      toggleRegisterModal () {
        this.$store.commit('ui/toggleModal', { modal: 'register' })
      }
    }
  }
</script>

<style lang="scss">

</style>
