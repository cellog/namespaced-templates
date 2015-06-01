Tinytest.add("namespaced templating pre-scanner", function (test) {
  var res

  // basic template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'foo_tpl')
  test.equal(res, '<template name="foo_foo"></template>')

  // nested path template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'foo_bar_tpl')
  test.equal(res, '<template name="foo_bar_foo"></template>')

  // no path template renaming
  res = html_scanner.preScan('<template name="foo"></template>', 'tpl')
  test.equal(res, '<template name="foo"></template>')

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