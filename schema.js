var graphql = require('graphql');

// Load mock data
var users = require('./users.json');
var events = require('./events.json');

/*
  User Type: Extends Object Type

  -> User: A User of the app

  # fields
    id: string
    name: string
    friends: [User]
    events: [Event]
 */

var userType


/*
  Event Type: Extends Object Type

  -> Event: An event listing in the app

  # fields
    title: string
    time: float
    creator: User
 */

var eventType


/*
  Root app schema

  Exposes a single root object, 'query'
  with 2 fields 'user' and 'event'

  These nodes can be queried directly by
  GraphQL API calls.
 */

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {}
  })
});

module.exports = schema;
