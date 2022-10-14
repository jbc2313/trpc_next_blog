import { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form'
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from '../util/trpc'


const Loginform = dynamic(() => import('../components/LoginForm'), {
    ssr: false,
})



function LoginPage() {

    return (
        <div>
            <Loginform />
        </div>
    )
}

export default LoginPage;
