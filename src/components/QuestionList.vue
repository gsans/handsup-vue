<template>
  <div class='list'>
    <ul>
      <Question v-for="(question, index) in sorted_questions"
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
    sorted_questions() {
      return this.questions.sort((a, b) => { return b.votes - a.votes;});
    }
  }
};
</script>