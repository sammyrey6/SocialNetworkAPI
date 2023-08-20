const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        thoughts: [Thought]!
        friends: [User]!
        friendCount: Int!
        }
    type Thought {
        _id: ID
        thoughtText: String!
        creadetdAt: String
        username: String!
        reactions: [Reaction]!
        reactionCount: Int!
        }
    type Reaction {
        _id: ID!
        reactionId: ID!
        reactionBody: String!
        createdAt: String!
        username: String!
        }
        type Auth {
    token: ID
    user: User
  }
type Query {
    users: User
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
    }
  type Mutation {
    # Define your mutations here
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    deleteUser(username: String!, email: String!, password: String!): User
    addFriend(username: String!, email: String!, password: String!): User
    removeFriend(username: String!, email: String!, password: String!): User
    addThought(username: String!, email: String!, password: String!): Thought
    updateThought(username: String!, email: String!, password: String!): Thought
    deleteThought(username: String!, email: String!, password: String!): Thought
    addReaction(username: String!, email: String!, password: String!): Reaction
    removeReaction(username: String!, email: String!, password: String!): Reaction
  }`;

module.exports = typeDefs;
