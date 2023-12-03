import DataLoader from 'dataloader'
import { Post, User } from '../schema/types'
import axios from 'axios'

let counter = 0
let counter2 = 0
export const userLoader = new DataLoader<number, User>(
  async (ids: readonly number[]): Promise<User[]> => {
    console.log({ ids })
    const idQueryParams = ids.map((id) => `id=${id}`).join('&')
    const { data } = await axios.get<User[]>(
      `https://jsonplaceholder.typicode.com/users?${idQueryParams}`
    )
    counter++
    console.log({ counter })
    return data
  }
)

export const postLoader = new DataLoader<number, (Post | undefined)[]>(
  async (userIds: readonly number[]): Promise<(Post | undefined)[][]> => {
    console.log({ userIds })
    const idQueryParams = userIds.map((id) => `userId=${id}`).join('&')
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?${idQueryParams}`
    )
    counter2++
    console.log({ counter2 })
    const postsMap = data.reduce<Record<number, Post[]>>(
      (acc, curr: Post) => ({
        ...acc,
        [curr.userId]: [...(acc[curr.userId] || []), curr],
      }),
      {}
    )
    return userIds.map((id) => postsMap[id])
  }
)
