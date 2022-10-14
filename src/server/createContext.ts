import { NextApiRequest, NextApiResponse } from "next";
import { verifyJwt } from "../util/jwt";
import { prisma } from '../util/prisma'

interface CtxUser {
    id: string
    email: string
    name: string
    iat: string
    exp: number
}

function getUserFromRequest(req: NextApiRequest){
    const token = req.cookies.token

    if(token){
        try{
            const verified = verifyJwt<CtxUser>(token)
            return verified
        }catch(e){
            return null
        }
    }
}

export function createContext({
    req, 
    res
}:{
    req: NextApiRequest, 
    res: NextApiResponse
}) {
    const user = getUserFromRequest(req)
    return {req, res, prisma, user} 
}

export type Context = ReturnType<typeof createContext>
