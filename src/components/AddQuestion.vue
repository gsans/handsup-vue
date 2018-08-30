<template>
  <div class='bottom_wrapper clearfix'>
    <div class='message_input_wrapper'>
      <form>
      <input ref="input"
        class='message_input'
        placeholder='Type your question here...'
        :maxlength="max" v-model="text"
      />
      <div class='counter'>{{max - text.length}}/{{max}}</div>
      <button class='send_message' type="button" :disabled="text.length===0"
        @click="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
const MAX_CHAR = 140

export default {
  data: () => ({
    text: "",
    max: MAX_CHAR
  }),
  methods: {
    submit(event){
      event.preventDefault()
      if (!this.text || this.text.length === 0) {
        return;
      }
      this.$emit("add", { body: this.$refs.input.value });
      this.$refs.input.value=''; 
      /* 
        .addQuestion(this.input.value, this.props.auth.userId)
        .then(() => {
          Alert.info('Question sent! ✨🚀', ALERT_DEFAULT)
          this.input.value = ''
          this.setState({
            chars_left: MAX_CHAR,
          })
        }) */      
    }
  }
};
</script>
