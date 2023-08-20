const {gql} = require ('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        thoughts: [Thought]!
        friends: [User]!]
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
}`;

module.exports = typeDefs
