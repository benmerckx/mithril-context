var m = require('mithril')
var redraw = require('mithril/redraw')

exports.createContext = function (context) {
  return {
    Provider: {
      oncreate: function (vnode) {
        this.root = document.createDocumentFragment()
        this.onupdate(vnode)
        redraw.subscribe(this.root, m.redraw)
        vnode.dom.parentNode.replaceChild(this.root, vnode.dom)
      },
      onremove: function () {
        redraw.unsubscribe(this.root)
      },
      onupdate: function (vnode) {
        var old = context
        context = vnode.attrs.value
        redraw.render(this.root, vnode.children)
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