Package.describe({
  name: 'cellog:namespaced-templates',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Namespaced spacebars templates reduce work and allow greater flexibility',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/cellog/namespaced-templates',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('templating')
  api.use('blaze')
  api.addFiles('goto.html', 'client')
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
  // minifiers is a weak dependency of spacebars-compiler; adding it here
  // ensures that the output is minified.  (Having it as a weak dependency means
  // that we don't ship uglify etc with built apps just because
  // boilerplate-generator uses spacebars-compiler.)
  // XXX maybe uglify should be applied by this plugin instead of via magic
  // weak dependency.
  use: ['minifiers', 'spacebars-compiler'],
  sources: [
    'plugin/htmlscanner.js',
    'plugin/compiler.js'
  ]
});