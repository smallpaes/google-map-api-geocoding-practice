import Vue from 'vue'
import Router from 'vue-router'
import NewRestaurant from './views/NewRestaurant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newRestaurant',
      component: NewRestaurant
    }
  ]
})
