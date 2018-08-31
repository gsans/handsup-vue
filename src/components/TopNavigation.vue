<template>
<nav class='navbar navbar-inverse navbar-fixed-top'>
  <div class='container'>
    <div class='row'>
      <div class='col-md-4 col-xs-3'>
        <Profile :profile="profile" :isLogged="isLogged"/>
      </div>
      <div class='col-md-4 col-xs-6'>
        <div class='centerBlock app-title'>
          HandsUp 🙌
        </div>
      </div>
      <div class='col-md-4 col-xs-3'>
        <div class='pull-right button-top'>
          <button class='btn btn-primary pull-right'>Login</button>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import Profile from './Profile'

export default {
  data: () => ({
    profile: { 
      picture: 'https://pbs.twimg.com/profile_images/953430046915559424/3qUVl6M-_400x400.jpg' 
    },
    isLogged: true
  }),
  components: {
    Profile
  },
}
</script>
