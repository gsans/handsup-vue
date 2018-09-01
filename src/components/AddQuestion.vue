<template>
  <div v-if="authenticated" class='bottom_wrapper clearfix'>
    <div class='message_input_wrapper'>
      <form v-on:submit.prevent="submit">
      <input
        class='message_input'
        placeholder='Type your question here...'
        :maxlength="max" v-model="text"
        @keyup="keyup"
      />
      <div class='counter'>{{max - text.length}}/{{max}}</div>
      <button class='send_message' type="submit"
        :disabled="text.length===0">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ListQuestions as QUESTIONS,
  AddQuestion as ADD_QUESTION
} from "../appsync/graphql";
var VueScrollTo = require("vue-scrollto");
const MAX_CHAR = 140;

export default {
  data: () => ({
    text: "",
    max: MAX_CHAR
  }),
  props: ["authenticated"],
  methods: {
    keyup(event) {
      this.text = event.target.value;
    },
    submit(event) {
      event.preventDefault();
      if (!this.text || this.text.length === 0) {
        return;
      }
      const question = { body: this.text };
      this.$apollo
        .mutate({
          mutation: ADD_QUESTION,
          variables: question,
          update: (store, { data: { createQuestion } }) => {
            if (createQuestion && "id" in createQuestion) {
              const data = store.readQuery({ query: QUESTIONS });
              data.questions.items.push(createQuestion);
              store.writeQuery({ query: QUESTIONS, data });
            }
          }
        })
        .then(() => {
          this.$notify({
            type: "success",
            group: "alerts",
            title: "Success",
            text: "Question added! ✨🚀"
          });

          this.text = "";
          setTimeout(() => {
            var options = {
              container: "#app",
              easing: "ease-in-out",
              offset: 0,
              cancelable: true,
              x: false,
              y: true
            };
            let elem = document.querySelector("#bottom");
            VueScrollTo.scrollTo(elem, 500, options);
          }, 500);
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
