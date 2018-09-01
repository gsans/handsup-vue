<template>
  <div id="app" class="app" v-if="hydrated">
    <QuestionList :questions="questions?questions.items:[]" @vote="vote" />
    <div class='flying-hearts' />
    <notifications class="alert" group="alerts" position="top right"/>
  </div>
</template>

<script>
import QuestionList from "./components/QuestionList.vue";

import { ListQuestions as QUESTIONS, AddVote as VOTE } from "./appsync/graphql";

export default {
  name: "app",
  data: () => ({
    hydrated: true,
    questions: []
  }),
  props: ["auth"],
  components: {
    QuestionList
  },
  apollo: {
    questions: {
      query: () => QUESTIONS,
      pollInterval: 30000
    }
  },
  methods: {
    vote(question) {
      this.$apollo
        .mutate({
          mutation: VOTE,
          variables: question
        })
        .catch(error => {
          this.$notify({
            type: "error",
            group: "alerts",
            title: "Error",
            text: error
          });
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Roboto, "Helvetica Neue, Helvetica, Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.alert .vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 20px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  opacity: 0.9;
}
.alert .vue-notification.warn {
  background: #ffcc33;
  color: #fff;
}
.alert .vue-notification.error {
  background: #f44336;
  color: #fff;
}
.alert .vue-notification.success {
  background: #45edc6;
  color: #fff;
}
</style>
