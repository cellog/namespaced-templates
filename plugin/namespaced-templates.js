my_html_scanner = _.extend({}, html_scanner)

my_html_scanner.oldScan = my_html_scanner.scan
my_html.scanner.scan = function(contents, source_name) {
  return my_html_scanner.oldScan(this.preScan(contents), source_name)
}
my_html_scanner.preScan = function(contents) {
  return contents.replace(/{{>>([^}\s]+)\s*([^}]+)\s*}}/, '{{>___goto template=$1 args=(___args $2)}}')
}

Plugin.registerSourceHandler(
  "ns.html", {isTemplate: true, archMatching: 'web'},
  function (compileStep) {
    doHTMLScanning(compileStep, my_html_scanner);
  }
);