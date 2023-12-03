import DataLoader from 'dataloader'
import type { Post, User } from './schema/types'

export type GraphQLContext = {
  loaders: {
    userLoader: DataLoader<number, User>
    postLoader: DataLoader<number, Post>
  }
}
