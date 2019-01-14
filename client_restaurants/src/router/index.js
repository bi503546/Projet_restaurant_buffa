import Vue from 'vue'
import Router from 'vue-router'
import Restaurants from '@/components/Restaurants'
import AppRestauDetail from '@/components/AppRestauDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/restaurant/:id',
      name: 'DétailsRestaurant',
      component: AppRestauDetail,
      props: true
    },
    {
      path: '/',
      name: 'Restaurants',
      component: Restaurants
    }
  ]
})
