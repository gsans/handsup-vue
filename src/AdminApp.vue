<template>
  <div id="app" class="app" v-if="hydrated">
    <QuestionList :questions="questions?questions.items:[]" @vote="vote" />
    <AddQuestion :authenticated="true" />
    <div class='flying-hearts' />
    <notifications class="alert" group="alerts" position="top right"/>
  </div>
</template>

<script>
import QuestionList from './components/QuestionList.vue'
import AddQuestion from './components/AddQuestion.vue'

import { 
  ListQuestions as QUESTIONS, 
  AddVote as VOTE
} from './appsync/graphql'

export default {
  name: 'app',
  data: () => ({
    hydrated: true,
    questions: []    
  }),
  props: ['auth', 'authenticated'],
  components: {
    QuestionList, AddQuestion
  },
  /* async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;
  },  */
  apollo: {
    questions: {
      query: () => QUESTIONS, 
      pollInterval: 30000
    }
  },
  methods: {
    vote(question) {
      this.$apollo.mutate({
        mutation: VOTE,
        variables: question,
      })
      .catch(error => {
        this.$notify({
          type: 'error',
          group: 'alerts',
          title: 'Error',
          text: error,
        });
      })            
    } 
  } 
}

/*
    setTimeout(() => {
      this.$notify({
        type: 'warn',
        group: 'alerts',
        title: 'Important message',
        text: 'Hello user! This is a notification!',
      });
    }, 2000);
*/
</script>

<style>
#app {
  font-family: Roboto,"Helvetica Neue, Helvetica, Arial",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.alert .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 20px;

  color: #ffffff;
  background: #44A4FC;
  border-left: 5px solid #187FE7;

  opacity: 0.9;
}
.alert  .vue-notification.warn {
  background: #ffcc33;
  color: #fff;
}
.alert  .vue-notification.error {
  background: #f44336;
  color: #fff;
}
.alert  .vue-notification.success {
  background: #45edc6;
  color: #fff;
}
</style>
