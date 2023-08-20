
const User = require('../models/User'); // Import User model
const Thought = require('../models/Thought'); // Import Thought model
const Reaction = require('../models/Reaction'); // Import Reaction model

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
    // /api/users
    addUser: async (_, { username, email }) => {
      return User.create({ username, email });
    },
    // /api/users/:userId
    updateUser: async (_, { userId, username, email }) => {
      return User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true }
      );
    },
    // /api/users/:userId
    deleteUser: async (_, { userId }) => {
      // Remove user's associated thoughts
      await Thought.deleteMany({ username: userId });
      return User.findByIdAndDelete(userId);
    },
    // /api/users/:userId/friends/:friendId
    addFriend: async (_, { userId, friendId }) => {
      return User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );
    },
    // /api/users/:userId/friends/:friendId
    removeFriend: async (_, { userId, friendId }) => {
      return User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );
    },
    // /api/thoughts
    addThought: async (_, { thoughtText, username, userId }) => {
      const thought = await Thought.create({ thoughtText, username });
      await User.findByIdAndUpdate(userId, { $addToSet: { thoughts: thought._id } });
      return thought;
    },
    // /api/thoughts/:thoughtId
    updateThought: async (_, { thoughtId, thoughtText }) => {
      return Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true }
      );
    },
    // /api/thoughts/:thoughtId
    deleteThought: async (_, { thoughtId }) => {
      return Thought.findByIdAndDelete(thoughtId);
    },
    // /api/thoughts/:thoughtId/reactions
    addReaction: async (_, { thoughtId, reactionBody, username }) => {
      const reaction = await Reaction.create({ reactionBody, username });
      await Thought.findByIdAndUpdate(
        thoughtId,
        { $addToSet: { reactions: reaction._id } }
      );
      return reaction;
    },
    // /api/thoughts/:thoughtId/reactions
    removeReaction: async (_, { thoughtId, reactionId }) => {
      await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: reactionId } }
      );
      return Reaction.findByIdAndDelete(reactionId);
    },
  },
};

module.exports = resolvers;
