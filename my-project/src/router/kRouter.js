import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import router from '@/views/router2'
import Vue from 'vue'
let Vue2

class VueRouter {
  constructor (options) {
    this.$options = options
    console.log(options, 'optip')
    this.routeMap = {}
    // 将来当前路径current需要响应式

    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init () {
    // 绑定浏览器事件
    this.bindEvents()

    // 解析路由配置
    this.createRouteMap(this.$options)

    // 创建router-link router-view
    this.initComponent()
  }
  bindEvents () {
    window.addEventListener('hashchange', this.onhashchange.bind(this))
    window.addEventListener('load', this.onhashchange.bind(this))
  }
  onhashchange (e) {
    console.log(e)
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap (options) {
    options.routes.forEach(item => {
      // ['home]: {path: '',components:'}
      this.routeMap[item.path] = item
    })
  }
  initComponent () {
    // 声明全局组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        // <a href="">
        return h('a', {attrs: {href: '#' + this.to}}, this.$slots.default)
        // return <a href={this.to}>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      render: (h) => {
        // this => vueRouter实例
        const comp = this.routeMap[this.app.current].component
        return h(comp)
      }
    })
  }
}

// 把VueRouter变为插件
VueRouter.install = function (_Vue) {
  Vue2 = _Vue
  // 混入任务
  Vue2.mixin({
    beforeCreate () {
      // 只执行一次
      if (this.$options.router) {
        console.log(this.$options)
        Vue.prototype.$router = this.$options.router
        Vue.prototype.$router.init()
      }
    }
  })
}
// 插件注册
Vue.use(VueRouter)

export default new VueRouter({
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
      path: '/router2',
      name: 'router',
      component: router
    }
  ]
})
