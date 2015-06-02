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

Template.registerHelper("___goto", function() {
  var args = Array.prototype.slice.call(arguments)
  if (args[1] === '***noargs***') {
    return {template: Namespacer.getTemplate(args[0]), data: Template.currentData()}
  }
  return {template: Namespacer.getTemplate(args[0]), data: args[1].hash}
})