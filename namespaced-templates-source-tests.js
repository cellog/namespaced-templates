Tinytest.add("namespaced templating pre-scanner basic source processing", function (test) {
  var res

  // basic template processing
  res = html_scanner.processSourcename('foo.ns.html')
  test.equal(res, 'foo')

  res = html_scanner.processSourcename('bar/foo.ns.html')
  test.equal(res, 'bar_foo')
})

Tinytest.add("namespaced templating pre-scanner clien/view directory source processing", function (test) {
  var res

  // client/view template processing
  res = html_scanner.processSourcename('client/foo.ns.html')
  test.equal(res, 'foo')

  res = html_scanner.processSourcename('client/views/foo.ns.html')
  test.equal(res, 'foo')

  res = html_scanner.processSourcename('client/bar/foo.ns.html')
  test.equal(res, 'bar_foo')

  res = html_scanner.processSourcename('client/views/bar/foo.ns.html')
  test.equal(res, 'bar_foo')
})