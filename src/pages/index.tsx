import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { trpc } from '../util/trpc'

const Home: NextPage = () => {
  
   const { data, error, isLoading } = trpc.useQuery(['users.me']) 

   if(isLoading){ 
        return <div>Loading so here is a clock. Real Time = Epoch Time: {Date.now()}</div>
   }

   if(error) {
     return <div>{JSON.stringify(error)}</div>
   }

   return <div>{JSON.stringify(data)}</div>
}

export default Home
