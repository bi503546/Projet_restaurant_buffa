// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Restaurants from './components/Restaurants'

Vue.config.productionTip = false

Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Restaurants },
  template: '<Restaurants/>'
})
