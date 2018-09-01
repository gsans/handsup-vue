<template>
  <Loading/>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'callback',
  components: {
    Loading
  },
  props: ['auth'],
  mounted () {
    this.auth.handleAuthentication()
  }
}
</script>