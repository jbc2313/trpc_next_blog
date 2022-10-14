import { useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form'
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from '../util/trpc'

function VerifyToken({hash}:{hash: string}) {
    const router = useRouter()
    const {data, isLoading} = trpc.useQuery(['users.verify-otp', {
        hash
    }])

    if(isLoading){
        return <p>Verifying...</p>
    }
    
    //router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')

    return <p>Redirecting...</p>
}

function Loginform() {
    const router = useRouter()
    const [success, setSuccess] = useState(false)
    const {handleSubmit, register} = useForm<CreateUserInput>()

    const { mutate, error } = trpc.useMutation(['users.request-onetimepassword'], {
        onError: (error) => {
       
        },
        onSuccess: () => {
            setSuccess(true)
        }
    })

    function onSubmit(values: CreateUserInput) {
        mutate(values)

    }

    const hash = router.asPath.split('#token=')[1]

    if(hash){
        return <VerifyToken hash={hash} />
    }

    return<>
        <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your Email!</p>}
        <h1>Login</h1>

        <input type="email" placeholder="pam@dunder.net" {...register('email')} />
        <button type='submit'>Login</button> 
        </form>
        <Link href="/register">register</Link>
    </>
}

export default Loginform;
