var graphql = require('graphql');

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  description: 'A User of the app',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    friends: {
      type: new graphql.GraphQLList(userType),
      resolve: (user, args, context, root) => user.friends.map(friendId => {
        return root.rootValue.loaders.users.load(friendId);
      })
    },
    events: {
      type: new graphql.GraphQLList(eventType),
      resolve: (user, args, context, root) => user.events.map(eventId => {
        return root.rootValue.loaders.events.load(eventId);
      })
    }
  })
});

var eventType = new graphql.GraphQLObjectType({
  name: 'Event',
  description: 'An event listing in the app',
  fields: () => ({
    id: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    time: { type: graphql.GraphQLFloat },
    creator: {
      type: userType,
      resolve: (event, args, context, root) => {
        return root.rootValue.loaders.users.load(event.creator);
      }
    }
  })
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, args, context) => {
          return _.loaders.users.load(args.id);
        }
      },

      event: {
        type: eventType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, args, context) => {
          return _.loaders.events.load(args.id);
        }
      }
    }
  })
});

module.exports = schema;
