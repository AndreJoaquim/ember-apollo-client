/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-apollo-client',

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/-apollo-client-bundle.js');
    this.import('vendor/-apollo-client-shims.js');
  },

  treeForVendor() {
    const WebpackDependencyPlugin = require('./lib/webpack-dependency-plugin');

    return new WebpackDependencyPlugin({
      outputName: 'apollo-client',
      expose: [
        'apollo-cache',
        'apollo-cache-inmemory',
        'apollo-client',
        'apollo-link',
        'apollo-link-context',
        'apollo-link-http',
        'graphql',
        'graphql-tools',
        'graphql-tag'
      ]
    });
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      registry.add('js', {
        name: 'ember-apollo-client',
        ext: 'graphql',
        toTree(tree) {
          const GraphQLFilter = require('./lib/graphql-filter');
          return new GraphQLFilter(tree);
        }
      });
    }
  }
};
