<template>
  <div class='profile mt8' v-if="isLogged">
    <img :src="profile.picture" />
  </div>  
</template>

<script>
export default {
  name: 'profile',
  props: ['profile', 'isLogged']
}
</script>
