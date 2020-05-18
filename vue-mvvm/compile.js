
//编译
class Compile{
  //el待编译模板 vm实例
  constructor(el, vm){
    this.$vm = vm
    this.$el = document.querySelector(el)

    this.$fragment = this.node2Fragment(this.$el)
    this.compile(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }

  node2Fragment(el){
    const fragment = document.createDocumentFragment()
    let child
    while(child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType == 1) {
        // 元素
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // {{xxx}}
        this.compileText(node)
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  isInter(node){
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileElement(node){
    const nodeAtts = node.attributes
    Array.from(nodeAtts).forEach(attr => {
      const attrName = attr.name // v-text
      const exp = attr.value // yyy
      if (attrName.indexOf('v-') == 0) {
        //指令
        const dir = attrName.substring(2) //xxx text/
        this[dir] && this[dir](node, this.$vm, exp)
      }
       if (attrName.indexOf("@") == 0) {
        const dir = attrName.substring(1)
        this.eventHandler(node, this.$vm, exp, dir)
       }
    })
  }
  text(node, exp) {
    this.update(node, exp, 'text')
  }
  model(node, vm, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', e => {
      vm[exp] = e.target.value
      console.log(vm)
    })
  }
  eventHandler(node, vm, exp, dir){
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (fn && dir) {
      node.addEventListener(dir, fn.bind(vm))
    }
  }
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  compileText (node) {
    // node.textContent = this.$vm[RegExp.$1]
    const exp = RegExp.$1
    this.update(node, exp, 'text')
    
  }
  update(node, exp, dir) {
    const updator = this[dir+'Updator']
    const value = this.$vm[exp]
    updator && updator(node, value)
    // 依赖收集完成
    new Watcher(this.$vm, exp, function (value) {
      updator && updator(node, value)
    })
  }
  modelUpdator(node, value) {
    node.value = value
  }
  htmlUpdator(node, value) {
    node.innerHtml = value
  }
  textUpdator(node, value){
    node.textContent = value
  }
}
