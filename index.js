var graphqlHTTP = require('express-graphql');
var express = require('express');
var schema = require('./schema');
var loaderSchema = require('./loader_schema');
var getLoaders = require('./loader');

express()
  .use('/graphql',        graphqlHTTP({ schema:schema, pretty:true, graphiql:true }))
  .use('/loader_graphql', graphqlHTTP(e => ({ schema:loaderSchema, pretty:true, graphiql:true, rootValue:{loaders: getLoaders()} })))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
