<template>
  <div class='list'>
    <ul>
      <Question v-for="(question, index) in questions"
        :key="index"
        :question="question"
      />
    </ul>
    <div v-if="questions.length===0" class='centered text-body'>There are no questions.</div>
    <Loading v-if="loading"/>
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
  data: () => ({
    loading: false
  }),
};
</script>