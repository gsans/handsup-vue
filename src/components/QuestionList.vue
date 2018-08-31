<template>
  <div class='list'>
    <ul>
      <Question v-for="(question, index) in sorted"
        :key="index"
        :question="question"
        @vote="vote"
      />
    </ul>
    <div v-if="questions && questions.length===0" class='centered text-body'>There are no questions.</div>
    <Loading v-if="$apollo.loading"/>
    <section id='bottom' />
  </div>
</template>

<script>
import Question from './Question.vue'
import Loading from './Loading.vue'

export default {
  name: 'question-list',
  components: {
    Question, Loading
  },
  props: ['questions'],
  methods: {
    vote(question) {
      this.$emit("vote", question);
    }
  },
  computed: {
    sorted() {
      debugger;
      
      if (!this.questions) {
        return this.questions;
      }
      const sorted = this.questions.slice();
      return sorted.sort((a, b) => a.votes.length < b.votes.length)
    }
  }
};
</script>