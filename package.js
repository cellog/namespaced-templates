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
  api.use('blaze')
  api.addFiles('namespaced-templates.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cellog:namespaced-templates');
  api.addFiles('namespaced-templates-tests.js');
});

Package.registerBuildPlugin({
  name: 'namespacedTemplates',
  use: ['underscore','templating'],
  sources: [
    'plugins/namespaced-templates.js'
  ]
})