var m = require('mithril')

exports.createContext = function (context) {
  return {
    Provider: {
      oncreate: function (vnode) {
        this.root = document.createDocumentFragment()
        this.onupdate(vnode)
        vnode.dom.parentNode.replaceChild(this.root, vnode.dom)
      },
      onupdate: function (vnode) {
        var old = context
        context = vnode.attrs.value
        m.render(this.root, vnode.children)
        context = old
      },
      view: function () {
        return m.trust('<!-- provider -->')
      }
    },
    Consumer: {
      view: function (vnode) {
        var render = 
          vnode.children[0] && typeof vnode.children[0].children == 'function' 
            ? vnode.children[0].children 
            : function () { return vnode.children }
        return render(context)
      }
    }
  }
}