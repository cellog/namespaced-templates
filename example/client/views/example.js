Template.body.events({
  'change input' : function(e) {
    Namespacer.setPath(e.target.value)
  }
})

Template.body.helpers({
  selected: function(path) {
    if (path == Namespacer.getPath()) {
      return {checked: ""}
    }
  }
})

Template.registerHelper("datadump", function() {
  return Spacebars.SafeString('<pre>' + EJSON.stringify(this) + "</pre>")
})

Namespacer.events('subthing', {
  'click button' : function() {
    var button = Template.instance().$('button')
    if (button.text() == 'Clicked me!') {
      button.text(this.savedtext)
      return
    }
    this.savedtext = button.text()
    button.text('Clicked me!')
  }
}, 'first:second')