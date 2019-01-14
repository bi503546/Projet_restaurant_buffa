import Vue from 'vue'
import Router from 'vue-router'
import Restaurants from '@/components/Restaurants'
import AppRestauDetail from '@/components/AppRestauDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/restaurants/details/:id',
      name: 'details',
      component: AppRestauDetail,
      props: true
    },
    {
      path: '/restaurants/menu/:id',
      name: 'menu',
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
