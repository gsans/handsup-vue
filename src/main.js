import Vue from 'vue'
import AppWrapper from './AppWrapper.vue'

import router from './router'

import $ from "jquery";
window.jQuery = window.$ = $;
require('bootstrap');
import "font-awesome/css/font-awesome.css"
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'

import VueTimeago from 'vue-timeago'
import Notifications from 'vue-notification'
var VueScrollTo = require('vue-scrollto');
import appsyncProvider from './appsync/client'

Vue.use(VueScrollTo);
Vue.use(VueTimeago);
Vue.use(Notifications);

Vue.config.productionTip = false

new Vue({
  router,
//  store,
  Notifications,
  provide: appsyncProvider.provide(),
  render: h => h(AppWrapper)
}).$mount('#app')
