import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Loginform from '../components/LoginForm'
import { useUserContext } from '../context/user.context'
import styles from '../styles/Home.module.css'
import { trpc } from '../util/trpc'

const Home: NextPage = () => {
    const user = useUserContext()

    if(!user){
        return <Loginform/>
    }

    return <div><Link href="/posts/new">Create Post</Link></div>
}

export default Home
