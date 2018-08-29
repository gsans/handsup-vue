import Vue from 'vue'
import App from './App.vue'
import $ from "jquery";
window.jQuery = window.$ = $;
require('bootstrap');
import "font-awesome/css/font-awesome.css"
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import VueTimeago from 'vue-timeago'
import Notifications from 'vue-notification'

Vue.use(VueTimeago);
Vue.use(Notifications);

Vue.config.productionTip = false

new Vue({
  Notifications,
  render: h => h(App)
}).$mount('#app')
