
const User = require('../models/User'); // Import your User model
const Thought = require('../models/Thought'); // Import your User model
const Reaction = require('../models/Reaction'); // Import your User model

const resolvers = {
  Query: {
// get all users
    users: async () => {
      return User.find().populate('thoughts friends');
    },
// get a user by username and populate thought and friend data
    user: async (parent, { _id }) => {
      return User.findById(_id).populate('thoughts friends');
  },
// get all thoughts
    thoughts: async (parent, { _id }) => {
return Thought.find().populate('reactions');
    },
// get a thought by _id
    thought: async (parent, { _id }) => {
      return Thought.findById(_id).populate('reactions');
  }
},
  Mutation: {
   
  },
};

module.exports = resolvers;
