Package.describe({
  name: 'cellog:namespaced-templates',
  version: '0.3.4',
  // Brief, one-line summary of the package.
  summary: 'Namespaced spacebars templates reduce work and allow greater flexibility',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/cellog/namespaced-templates',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('templating')
  api.use('blaze')
  api.use('spacebars-compiler')
  api.use('tracker')
  api.export('Namespacer')
  api.addFiles('goto.js', 'client')
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('htmljs');
  api.use('templating');
  api.use('cellog:namespaced-templates');
  api.use('underscore');
  api.use(['test-helpers', 'session', 'tracker',
    'minimongo'], 'client');
  api.use('spacebars-compiler');
  api.use('minifiers'); // ensure compiler output is beautified

  api.addFiles([
    'plugin/htmlscanner.js',
    'namespaced-templates-tests.js',
    'namespaced-templates-source-tests.js'
  ], 'server');
});

Package.registerBuildPlugin({
  name: "compileNamespacedTemplates",
  use: ['minifiers@1.1.5', 'spacebars-compiler@1.0.6'],
  sources: [
    'plugin/htmlscanner.js',
    'plugin/compiler.js'
  ],
  npmDependencies: {
    debug: "2.2.0"
  }
});