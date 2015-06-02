Template.body.events({
  'change input' : function(e) {
    Namespacer.setPath(e.target.value)
  }
})

Template.body.helpers({
  template_path: function() {
    return Namespacer.getPath()
  },
  selected: function(path) {
    if (path == Namespacer.getPath()) {
      return {checked: ""}
    }
  }
})