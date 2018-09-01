<template>
  <li class="question.flagged?'flagged':''">
    <div class='row'>
      <div class='col-md-11 col-xs-10'>
        <div class='text-body'>
          <p style="text-overflow: ellipsis; overflow: hidden;">
            <TweetParser :message="question.body"/></p></div>
        <Votes :votes="question.votes.length" />
        <div class='profile-container'>
          <div class='profile-small'>
            <img :src="question.pictureUrl? question.pictureUrl :'https://i.imgur.com/o31QkBR.png'"/>
          </div>
          <div class='profile-small-text'>
            by 
            {{question.user? question.user.username : '@vuejssummit'}}
            <span class='hidden-xs'>, 
              <timeago :datetime="question.createdAt" :auto-update="60"></timeago>
            </span>
          </div>
        </div>
      </div>
      <div class='col-md-1 col-xs-2'>
        <div class='vote'>
          <button class='btn btn-circle'
            @click="onSubmit">
            <i class='fa fa-heart' />
          </button>
        </div>
      </div>
    </div>
    <!-- moderator options -->
  </li>
</template>

<script>
import $ from "jquery";
import Votes from "./Votes.vue";
import TweetParser from "./TweetParser.vue";

export default {
  name: "question",
  components: {
    Votes,
    TweetParser
  },
  props: ["question"],
  data: () => ({}),
  methods: {
    onSubmit() {
      this.flyingHearts(".flying-hearts");
      this.$emit("vote", { question: this.question.id });
    },
    flyingHearts(selector) {
      let rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      let id = `heart-${rnd(0, 100)}`;
      let waves = ["flying1", "flying2", "flying3"];
      let colors = ["#e91e63", "#642889", "#00cafe", "#144bcb", "#8bc34a"];
      let duration = rnd(1000, 2000);
      let color = colors[rnd(1, 100) % colors.length];
      let size = rnd(20, 50);
      let wave = waves[rnd(1, 100) % waves.length];

      $(
        `<div class="heart ${id}" style="font-size:${size}px; color:${color};"><i class="fa fa-heart-o"></i><i class="fa fa-heart"></i></div>`
      )
        .appendTo(`${selector}`)
        .css({ animation: `${wave} ${duration}ms ease-in-out` });
      $(`.${id}`).show();
      setTimeout(() => $(`.${id}`).remove(), duration);
    }
  }
};
</script>