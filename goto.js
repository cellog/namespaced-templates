var tracker = new Tracker.Dependency

function _namespacer(path) {
 this.template_path = path
}


Namespacer = new _namespacer('')

_namespacer.prototype.getTemplate = function(name) {
  var path = this.getPath()
  if (!path) {
    path = ['']
  } else {
    path = path.split(':')
    path.push('')
  }
  for (var i = 0; i < path.length; i++) {
    var check = (path[i].length ? path[i] + '_' : path[i]) + name
    if (undefined !== Template[check]) {
      return check
    }
  }
  return name
}

_namespacer.prototype.getPath = function() {
  tracker.depend()
  return this.template_path
}

_namespacer.prototype.setPath = function(name) {
  if (name != this.template_path) {
    tracker.changed()
  }
  this.template_path = name
}

var template_path
Template.___goto.helpers({
  __goto__: function() {
    return Namespacer.getTemplate(this.__template__)
  },
  __args__: function() {
    var x = _.extend({}, this)
    if (x.length == 2 && undefined !== x.__parentcontext__) {
      return x.__parentcontext__
    }
    delete x.__template__
    delete x.__parentcontext__
    return x
  }
})

Template.registerHelper('set_template_path', function(data) {
  Namespacer.setPath(data)
})