import clc from 'cli-color'
import { createServer } from 'node:http'
import { YogaServerOptions, createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { GraphQLContext } from './types'
import { userLoader, postLoader } from './loaders'

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga<GraphQLContext>({
  schema,
  context: {
    loaders: {
      userLoader,
      postLoader,
    },
  },
})

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
  console.info(
    clc.blueBright('Server is running 🚀 on http://localhost:4000/graphql')
  )
})
