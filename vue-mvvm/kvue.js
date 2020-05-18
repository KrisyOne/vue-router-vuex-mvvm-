class KVue{
  constructor(options){
    //保存选项
    this.$options = options
    
    this.$data = options.data

    //响应化处理
    this.observe(this.$data)

    // new Watcher(this, 'foo')
    // this.foo;
    // new Watcher(this, 'bar.mua')
    // this.bar.mua;
    new Compile(options.el, this)
    options.created.call(this)
  }

  observe(value){
    if (!value || typeof value !== 'object') {
      return
    }

    //遍历
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      // $data挂在this
      this.proxyData(key)
    })
  }
  defineReactive(obj, key, val) {
    //递归
    this.observe(val)

    const dep = new Dep();//dep实例和data每个key一对一关系

    // 给obj的key定义拦截
    Object.defineProperty(obj, key, {
      get () {
        //依赖收集
        Dep.target && dep.add(Dep.target);
        return val
      },
      set(newVal) {
        if (val !== newVal){
          val = newVal
          // console.log(key+'属性更新')
          dep.notify()
        }
      }
    })
  }
  proxyData(key){
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// 管理所有的watcher
class Dep{
  constructor() {
    //存储所有依赖
    this.deps = []
  }
  add (dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

//保存data与页面中的挂钩关系
class Watcher{
  constructor(vm, key, cb){
    //创建实例，将该实例指向Dep.target，便于依赖收集
    Dep.target = this
    this.vm = vm
    this.key = key
    this.cb = cb
    this.vm[this.key] //触发依赖收集
    Dep.target = null
  }

  update() {
    this.cb.call(this.vm, this.vm[this.key])
  }
}
