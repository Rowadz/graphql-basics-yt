// import gql from 'graphql-tag'
import axios from 'axios'
import { createSchema } from 'graphql-yoga'
import type { Post, User } from './types'
import type { GraphQLContext } from '../types'

let counter = 0

export const schema = createSchema<GraphQLContext>({
  // or use gql``
  typeDefs: /* GraphQL */ `
    type Company {
      name: String
      catchPhrase: String
      bs: String
    }
    type Geo {
      lat: String
      lng: String
    }
    type Address {
      street: String
      suite: String
      city: String
      zipcode: String
      geo: Geo
    }
    type User {
      id: Int
      name: String
      username: String
      email: String
      phone: String
      website: String
      company: Company
      address: Address
      nextUser: User
      posts: [Post]
    }

    type Post {
      userId: Int
      id: Int
      title: String
      body: String
      user: User
    }

    type Query {
      hello: [String!]
      number: Int
      user(id: Int!): User
    }
  `,
  resolvers: {
    User: {
      nextUser: async (
        user: User,
        {}: { id: number },
        { loaders: { userLoader } }
      ) => {
        return userLoader.load(user.id + 1)
      },
      posts: async (
        user: User,
        {}: { id: number },
        { loaders: { postLoader } }
      ) => {
        const { id } = user
        return postLoader.load(id)
      },
    },
    Post: {
      user: async (post: Post, _, { loaders: { userLoader } }) => {
        const { userId } = post
        return userLoader.load(userId)
      },
    },
    Query: {
      user: async (_, { id }: { id: number }, { loaders: { userLoader } }) => {
        return userLoader.load(id)
      },
      hello: () => ['World'],
      number: () => 1,
    },
  },
})
