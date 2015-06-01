Package.describe({
  name: 'cellog:namespaced-templates',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Compile Spacebars templates to intelligently create their name from the path to the file.  This allows namespaced templates',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/cellog/namespaced-templates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('templating')
  api.use('blaze')
  api.addFiles('goto.html', 'client')
  api.addFiles('goto.js', 'client')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cellog:namespaced-templates');
  api.addFiles('namespaced-templates-tests.js');
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