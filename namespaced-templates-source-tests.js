Tinytest.add("namespaced templating pre-scanner source processing", function (test) {
  var res

  // basic template processing
  res = html_scanner.processSourcename('foo.ns.html')
  test.equal(res, 'foo')

  res = html_scanner.processSourcename('bar/foo.ns.html')
  test.equal(res, 'bar_foo')

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