const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');
const userData = require('./users.json');
const thoughtData = require('./thoughts.json');
const reactionData = require('./reactions.json');

mongoose.connect('mongodb://localhost/social-media', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Seed users
    const users = await User.insertMany(userData);

    // Seed thoughts with user references
    const thoughts = thoughtData.map((thought, index) => ({
      ...thought,
      userId: users[index]._id,
    }));
    await Thought.insertMany(thoughts);

    // Seed reactions with user and thought references
    const reactions = reactionData.map((reaction, index) => ({
      ...reaction,
      userId: users[index]._id,
      thoughtId: thoughts[index]._id,
    }));
    await Reaction.insertMany(reactions);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
