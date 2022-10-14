import { createRouter } from '../createRouter' 
import { createUserSchema } from '../../schema/user.schema'

export const userRouter = createRouter()
.mutation('register-user', {
    input: createUserSchema,
    output: 
    resolve: async ({ctx}) => {
        ctx.prisma
    }
})

