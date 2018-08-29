<template>
  <div id="app">
    <TopNavigation/>
    <QuestionList :questions="questions"/>
    <AddQuestion/>
    <div class='flying-hearts' />
    <notifications class="alert" group="alerts" position="top right"/>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue'
import AddQuestion from './components/AddQuestion.vue'
import QuestionList from './components/QuestionList.vue'

export default {
  name: 'app',
  data: () => ({
    questions: [{
      body: "Any update about React Native for macOS (native desktop apps)?",
      user: { 
        name: "test",
        username: "@michamazaheri"
      },
      createdAt: Date.now(),
      flagged: false   
    }]    
  }),
  components: {
    TopNavigation, AddQuestion, QuestionList
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
