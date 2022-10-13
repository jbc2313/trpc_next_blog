import { createReactQueryHooks } from '@trpc/react'
import { AppRouter } from '../server/route/app.router'

// add app router as generic
export const trpc = createReactQueryHooks<AppRouter>()
