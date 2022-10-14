import { createPostSchema, getSinglePostSchema } from '../../schema/post.schema'
import { createRouter } from '../createRouter'
import { userRouter } from './user.router'
import * as trpc from '@trpc/server'


export const postRouter = createRouter()
//.middleware(async ({ ctx }) => {     THIS IS MIDDLE WARE APPROACH
//  if(!ctx.user){
//      you cant see nothing!! sorry!
//  }
//}
.mutation('create-post', {
    input: createPostSchema,
    async resolve({ ctx, input }) {
        if(!ctx.user){
            new trpc.TRPCError({
                code: 'FORBIDDEN',
                message: 'Please Login before creating a post!',
            })
        }

        const post = await ctx.prisma.post.create({
            data: {
                ...input,
                user: {
                    connect: {
                        id: ctx.user?.id,
                    }
                }
            }
        })

        return post
    },
})
.query('posts', {
    resolve({ ctx }) {
        return ctx.prisma.post.findMany()
    },
})
.query('single-post', {
    input: getSinglePostSchema,
    resolve({input, ctx}) {
        return ctx.prisma.post.findUnique({
            where: {
                id: input.postId,
            }
        })
    }
})
