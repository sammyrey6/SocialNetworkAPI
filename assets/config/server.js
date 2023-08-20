const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('../schema/typeDefs');
const resolvers = require('../schema/resolvers');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server before applying middleware
async function startServer() {
  await server.start();

  // Apply middleware to express app
  server.applyMiddleware({ app });

  mongoose
    .connect('mongodb://localhost/social-media', {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}/graphql`);
      });
    })
    .catch((err) => console.error(err));
}

startServer();
