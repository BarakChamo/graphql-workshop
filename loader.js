var DataLoader = require('dataloader');

// Mock JSON data
var users = require('./users.json');
var events = require('./events.json');

/*
  Batch user loader
  Accepts a list of user ids
  and returns an array of promises resolving to user records.
 */
var batchGetUsers =  userIds  => {
  return userIds.map(userId   => {
    return new Promise(resolve => resolve(users[userId]));
  });
};


/*
  Batch user loader
  Accepts a list of event ids
  and returns an array of promises resolving to event records.
 */
var batchGetEvents = eventIds => {
  return eventIds.map(eventId => {
    return new Promise(resolve => resolve(events[eventId]));
  });
};


/*
  Export a function that initializes new loaders

  This is done so that we can create new loaders
  for every incoming request. This means that
  records will only be cached within one request
  and not for a longer period of time.
 */
module.exports = function loaders() {
  return {
    users:  new DataLoader(keys => {
      console.log('FETCH USERS',keys);
      return Promise.all(batchGetUsers(keys));

    }),
    events: new DataLoader(keys => {
      console.log('FETCH EVENTS',keys);
      return Promise.all(batchGetEvents(keys));
    })
  };
};
