var template_path
Template.___goto.helpers({
  __goto__: function() {
    var path = template_path
    if (!path) {
      path = ['']
    } else {
      path = path.split(':')
      path.push('')
    }
    for (var i = 0; i < path.length; i++) {
      var check = (path[i].length ? path[i] + '_' : path[i]) + this.__template__
      if (undefined !== Template[check]) {
        return check
      }
    }
    return this.__template__
  },
  __args__: function() {
    var x = _.extend({}, this)
    delete x.__template__
    return x
  }
})

Template.registerHelper('set_template_path', function(data) {
  template_path = data
})