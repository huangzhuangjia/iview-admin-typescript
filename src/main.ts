// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/scss/index.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
const app: Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default app
