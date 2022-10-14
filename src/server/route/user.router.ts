import { createRouter } from '../createRouter' 
import { createUserOutputSchema, createUserSchema, requestOtpSchema, verifyOtpSchema } from '../../schema/user.schema'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { sendLoginEmail } from '../../util/mailer'
import { url } from '../../constants'
import { encode, decode } from '../../util/base64'
import { signJwt } from '../../util/jwt'
import { serialize } from 'cookie'




export const userRouter = createRouter()
.mutation('register-user', {
    input: createUserSchema,
    resolve: async ({ctx, input}) => {
        
        const {email, name} = input
        
        try{
            const user = await ctx.prisma.user.create({
                data: {
                    email,
                    name,

                },
            })
        } catch(e){
            if(e instanceof PrismaClientKnownRequestError){
                if(e.code === 'P2002'){
                    throw new trpc.TRPCError({
                        code: 'CONFLICT',
                        message: 'User already exists in DB',
                    })
                }
            }

            throw new trpc.TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'something went wrong',
            })
        }
    }
}).mutation('request-onetimepassword', {
    input: requestOtpSchema,
    async resolve({ input, ctx }){
        const {email, redirect} = input

        const user = await ctx.prisma.user.findUnique({
            where: {
                email,
            },
        })

        if(!user){
            throw new trpc.TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found',
            })
        }

        const token = await ctx.prisma.loginToken.create({
            data: {
                redirect,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        })

        await sendLoginEmail({
            token: encode(`${token.id}:${user.email}`),
            url: url,
            email: user.email,
        })
    }
}).query('verify-otp', {
    input: verifyOtpSchema,
async resolve({input, ctx}) {
    const decoded = decode(input.hash).split(":")
    const [id, email] = decoded
    const token = await ctx.prisma.loginToken.findFirst({
        where: {
            id,
            user: {
                email,
            },
        },
        include: {
            user: true,
        },
    })

    if(!token) {
        throw new trpc.TRPCError({
            code: 'FORBIDDEN',
            message: 'Invalid Token',
        })
    }

    const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
    })
    
    ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

    return {
        redirect: token.redirect
    }
}
})

// .query('me', {
//   resolve({ ctx }) {
//     return ctx.user
//   }
// })

