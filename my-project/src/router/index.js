import Vue from 'vue'
// import Router from 'vue-router'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import router from '@/views/router2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/router',
      name: 'router',
      component: router
    },
  ]
})
