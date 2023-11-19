// import gql from 'graphql-tag'
import axios from 'axios'
import { createSchema } from 'graphql-yoga'
import { Post, User } from './types'

let counter = 0

export const schema = createSchema({
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
      nextUser: async (user: User, {}: { id: number }) => {
        const { id } = user
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id + 1}`
        )
        counter++
        console.log({ counter })
        return data
      },
      posts: async (post: Post, {}: { id: number }) => {
        const { id } = post
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        )
        counter++
        console.log({ counter })
        return data
      },
    },
    Post: {
      user: async (post: Post) => {
        const { userId } = post
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
        counter++
        console.log({ counter })
        return data
      },
    },
    Query: {
      user: async (_, { id }: { id: number }) => {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )
        counter++
        console.log({ counter })
        return data
      },
      hello: () => ['World'],
      number: () => 1,
    },
  },
})
