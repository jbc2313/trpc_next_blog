import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from '../../../server/createContext'
import { appRouter } from '../../../server/route/app.router'


export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
    onError({error}){
        if(error.code === "INTERNAL_SERVER_ERROR"){
            console.error('Something went terribly wrong', error)
        } else {
            console.error(error) 
        }
    }
})
