import { prismaObjectType, stringArg } from 'yoga'

/*
type Query {
  feed: [Post!]!
  filterPosts(searchString: String!): [Post!]!
}
*/
export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    // Call t.primaFields to expose, hide, or customize fields
    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.posts({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg(),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.posts({
          where: {
            OR: [
              { title_contains: searchString },
              { content_contains: searchString },
            ],
          },
        })
      },
    })
  },
})
