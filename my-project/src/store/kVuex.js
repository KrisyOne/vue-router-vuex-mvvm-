// 维护状态
// 修改状态commit
// 业务逻辑控制 dispatch
// 状态派发 getter
// state响应式
// 插件
// 混入
let Vue
function install (_vue) {
  Vue = _vue

  // store指定到Vue原型上
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

class Store {
  constructor (options = {}) {
    // 利用vue的响应式
    this.state = new Vue({
      data: options.state
    })

    this.mutaions = options.mutations || {}

    this.actions = options.actions || {}
    this.getters && this.handlerGetters(this.getters)
  }

  // 触发mutations,需要实现commit
  commit = (type, arg) => {
    const fn = this.mutaions[type]
    fn(this.state, arg)
  }
  dispatch (type, arg) {
    const fn = this.actions[type]
    return fn({commit: this.commit, state: this.state}, arg)
  }
  handlerGetters (getters) {
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }
}

export default {Store, install}
