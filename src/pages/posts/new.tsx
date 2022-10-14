import { useForm } from "react-hook-form"
import { CreatePostInput } from '../../schema/post.schema'
import { trpc } from '../../util/trpc'

function CreatePostPage() {

const {handleSubmit, register} = useForm<CreatePostInput>()

const {mutate, error} = trpc.useMutation(['posts.create-post'])

function onSubmit(values: CreatePostInput){
    mutate(values)
}

return <form>
    {error && error.message}

    <h1>Create Posts</h1>

    <input 
        type='text'
        placeholder="Your post title"
        {...register('title')}
    />

    <textarea
        placeholder="Your post here"
        {...register('body')}
    />

</form>
}

export default CreatePostPage;
