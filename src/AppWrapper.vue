<template>
  <div class="app-wrapper">
    <TopNavigation
      :auth="auth" 
      :authenticated="authenticated" 
      :login="login" 
      :logout="logout"
    />
    <router-view :auth="auth">
    </router-view>  
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue'
import AuthService from './auth0/AuthService';
const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app-wrapper',
  components: {
    TopNavigation
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

