// import gql from 'graphql-tag'
import axios from 'axios'
import { createSchema } from 'graphql-yoga'

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
      s: Int
      user(id: Int!): User
    }
  `,
  resolvers: {
    User: {
      nextUser: async (parnet: unknown, {}: { id: number }) => {
        const { id } = parnet as { id: number }
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id + 1}`
        )
        counter++
        console.log({ counter })
        return data
      },
      posts: async (parnet: unknown, {}: { id: number }) => {
        const { id } = parnet as { id: number }
        console.log(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        )
        counter++
        console.log({ counter })
        return data
      },
    },
    Post: {
      user: async (parnet: unknown) => {
        const { userId } = parnet as { userId: number }
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        )
        counter++
        console.log({ counter })
        return data
      },
    },
    Query: {
      user: async (parnet: unknown, { id }: { id: number }) => {
        console.log({ parnet })
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )
        counter++
        console.log({ counter })
        return data
      },
      hello: () => ['World'],
      s: () => 1,
    },
  },
})
