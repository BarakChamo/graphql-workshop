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

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'A User of the app',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },

    /*
      Friends resolver

      Recieves a user model and returns an array of user promises
     */
    friends: {
      type: new graphql.GraphQLList(userType),
      resolve: (user, args, context) => {
        console.log('FETCH USER');

        return user.friends.map(friendId => {
          return new Promise(resolve => resolve(users[friendId]));
        });
      }
    },

    /*
      Events resolver

      Recieves a user model and returns an array of event promises
     */
    events: {
      type: new graphql.GraphQLList(eventType),
      resolve: (user, args, context) => {
        console.log('FETCH EVENT');

        return user.events.map(eventId => {
          return new Promise(resolve => resolve(events[eventId]));
        });
      }
    }
  })
});


/*
  Event Type: Extends Object Type

  -> Event: An event listing in the app

  # fields
    title: string
    time: float
    creator: User
 */

var eventType = new graphql.GraphQLObjectType({
  name: 'Event',
  description: 'An event listing in the app',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    time: { type: graphql.GraphQLFloat },

    /*
      Creator resolver

      Recieves a user id and resolves to the user model
     */
    creator: {
      type: userType,
      resolve: (event, args, context) => {
        console.log('FETCH USER');

        return new Promise(resolve => resolve(users[event.creator]));
      }
    }
  })
});


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
    fields: {
      user: {
        type: userType,
        args: {
          // User id
          id: { type: graphql.GraphQLString }
        },

        // Resolve the user from provided user id
        resolve: (_, args) => {
          console.log('FETCH USER');
          return new Promise(resolve => resolve(users[args.id]));
        }
      },

      event: {
        type: eventType,
        args: {
          // Event id
          id: { type: graphql.GraphQLString }
        },

        // Resolve the event from provided event id
        resolve: (_, args) => {
          console.log('FETCH EVENT');
          return new Promise(resolve => resolve(events[args.id]));
        }
      }
    }
  })
});

module.exports = schema;
