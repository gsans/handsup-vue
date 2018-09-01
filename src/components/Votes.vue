<template>
  <ul class='blocks'>
    <li v-for="(blocks, index) in blocks" 
      :key="index" class='block' />
  </ul>
</template>

<script>
export default {
  name: "votes",
  props: ["votes"],
  computed: {
    blocks() {
      return getBaseLog(this.votes);
    }
  }
};

function getBaseLog(y) {
  return Math.ceil(Math.log(Math.pow(y + 2, 6)) / Math.log(5) / 5);
}
</script>