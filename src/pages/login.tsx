import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form'
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from '../util/trpc'
function LoginPage() {
    const router = useRouter()
    const {handleSubmit, register} = useForm<CreateUserInput>()

    // const { mutate, error } = trpc.useMutation(['users.register-user'], {
    //     onError: (error) => {
    //    
    //     },
    //     onSuccess: () => {
    //         router.push('/login')
    //     }
    // })

    function onSubmit(values: CreateUserInput) {
        // mutate(values)

    }

    return<>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* error && error.message */}
        <h1>Login</h1>

        <input type="email" placeholder="pam@dunder.net" {...register('email')} />
       
        </form>
        <Link href="/register">Register</Link>
    </>
}

export default LoginPage;
