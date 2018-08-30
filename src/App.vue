<template>
  <div id="app" class="app" v-if="hydrated"> 
    <TopNavigation/>
    <QuestionList :questions="questions?questions.items:[]" @vote="vote"/>
    <AddQuestion @add="add"/>
    <div class='flying-hearts' />
    <notifications class="alert" group="alerts" position="top right"/>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue'
import AddQuestion from './components/AddQuestion.vue'
import QuestionList from './components/QuestionList.vue'

import { 
  ListQuestions as QUESTIONS, 
  AddQuestion as ADD_QUESTION,
  AddVote as VOTE
} from './appsync/graphql'

/*
{
  body: "Any update about React Native for macOS (native desktop apps)?",
  user: { 
    name: "test",
    username: "@michamazaheri"
  },
  createdAt: Date.now(),
  flagged: false   
}
*/

export default {
  name: 'app',
  data: () => ({
    hydrated: true,
    questions: []    
  }),
  components: {
    TopNavigation, AddQuestion, QuestionList
  },
  /* async mounted() {
    await this.$apollo.provider.defaultClient.hydrated();
    this.hydrated = true;
  }, */
  apollo: {
    questions: {
      query: () => QUESTIONS,
    }
  },
  methods: {
    add(question) {
      this.$apollo.mutate({
        mutation: ADD_QUESTION,
        variables: question,
        update: (store, { data: { createQuestion } }) => {
          if ('id' in createQuestion) {
            if ('totalVotes' in createQuestion) {
              if (!createQuestion.totalVotes) {
                createQuestion.totalVotes = 0;
              } else {
                createQuestion.totalVotes = createQuestion.votes.items.length || 0;
              }
            }
          }
          const data = store.readQuery({ query: QUESTIONS })
          data.questions.items.push(createQuestion)
          store.writeQuery({ query: QUESTIONS, data })
        },
        /* optimisticResponse: {
          __typename: 'Mutation',
          createQuestion: {
            __typename: 'Question',
            ...question
          }
        }, */
      })
      .catch(error => {
        this.$notify({
          type: 'error',
          group: 'alerts',
          title: 'Error',
          text: error,
        });
      })      
    },
    vote(question) {
      debugger;
      this.$apollo.mutate({
        mutation: VOTE,
        variables: question,
        update: (store, { data: { createVote } }) => {
          const data = store.readQuery({ query: QUESTIONS })
          store.writeQuery({ query: QUESTIONS, data })
        },
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
