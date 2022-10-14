import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { trpc } from '../util/trpc'

const Home: NextPage = () => {
  
    

    
    return <div>{Date.now()}</div>
}

export default Home
