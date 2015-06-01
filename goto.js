Template.___goto.helpers({
  goto: function() {
    var path = Session.get('___template_path')
    if (!path) {
      path = ['']
    } else {
      path = path.explode(':')
      path.push('')
    }
    for (var i = 0; i < path.length; i++) {
      var check = (path.length ? path + '_' : path) + this.template
      if (undefined !== Template[check]) {
        return this.template
      }
    }
    return this.template
  }
})

Template.registerHelper('___args', function(data) {
  return data
})

Template.registerHelper('set_template_path', function(data) {
  Session.set('___template_path', data)
})