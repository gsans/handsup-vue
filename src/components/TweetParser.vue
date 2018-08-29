<template>
  <p class="parser" style="text-overflow: ellipsis; overflow: hidden;" v-html="linkified"></p>
</template>

<script>
var twitter = require('twitter-text')

export default {
  props: ['message'],
  data: () => ({
    linkified: ''
  }),
  mounted() {
    this.linkified = twitter.autoLink(twitter.htmlEscape(this.message));
  } 
}
</script>
