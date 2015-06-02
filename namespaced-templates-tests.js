Tinytest.add("namespaced templating basic pre-scanner", function (test) {
  var res

  // basic template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'foo_tpl')
  test.equal(res, '<template name="foo_foo"></template>')
})

Tinytest.add("namespaced templating nested path pre-scanner", function (test) {
  var res

  // nested path template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'foo_bar_tpl')
  test.equal(res, '<template name="foo_bar_foo"></template>')
})

Tinytest.add("namespaced templating no path pre-scanner", function (test) {
  var res

  // no path template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'tpl')
  test.equal(res, '<template name="foo"></template>')
})

Tinytest.add("namespaced templating testing ${{>template}} replacement pre-scanner", function (test) {
  var res

  // replace ${{>
  res = html_scanner.preScan('<template name="foo">{{>other}}${{>our}}</template>', 'foo_tpl')
  test.equal(res, '<template name="foo_foo">{{>other}}{{> ___goto __parentcontext__=.. __template__="our"}}</template>')

  res = html_scanner.preScan('<template name="foo">{{>other}}${{>our item1="thing" }}</template>', 'foo_tpl')
  test.equal(res, '<template name="foo_foo">{{>other}}{{> ___goto __parentcontext__=.. __template__="our" item1="thing" }}</template>')

  // 2 templates in the same file
  res = html_scanner.preScan('<template name="foo">{{>other}}${{>our item1="thing" }}</template>' +
                             '<template name="next">${{>bar}}</template>', 'foo_tpl')
  test.equal(res, '<template name="foo_foo">{{>other}}{{> ___goto __parentcontext__=.. __template__="our" item1="thing" }}</template>' +
                  '<template name="foo_next">{{> ___goto __parentcontext__=.. __template__="bar"}}</template>')

})

Tinytest.add("namespaced template with <body> tag pre-scanner", function(test) {
  var res

  res = html_scanner.preScan("<head>\n"+
    "<title>Namespaced Templates Example</title>\n" +
    "</head>\n" +
    "\n" +
    "<body>\n" +
    "<h1>Welcome to Meteor!</h1>\n" +
    "\n" +
    "<h2>Please select a template path</h2>\n" +
    "<input type=\"radio\" name=\"template\" id=\"first\" value=\"first:second\"><label for=\"first\">first:second</label>\n" +
    "<input type=\"radio\" name=\"template\" id=\"second\" value=\"second:first\"><label for=\"second\">second:first</label>\n" +
    "${{> hello}}\n" +
    "</body>", 'example', true)
  test.equal(res, "<head>\n"+
    "<title>Namespaced Templates Example</title>\n" +
    "</head>\n" +
    "\n" +
    "<body>\n" +
    "<h1>Welcome to Meteor!</h1>\n" +
    "\n" +
    "<h2>Please select a template path</h2>\n" +
    "<input type=\"radio\" name=\"template\" id=\"first\" value=\"first:second\"><label for=\"first\">first:second</label>\n" +
    "<input type=\"radio\" name=\"template\" id=\"second\" value=\"second:first\"><label for=\"second\">second:first</label>\n" +
    "{{> ___goto __parentcontext__=.. __template__=\"hello\"}}\n" +
    "</body>")
})