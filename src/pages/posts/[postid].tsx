import { useRouter } from 'next/router'
import {trpc} from '../../util/trpc'
import Error from 'next/error'

const SinglePostPage = () => {
    const router = useRouter()

    const postId = router.query.postid as string

    const {data, error, isLoading} = trpc.useQuery(['posts.single-post', {postId}])

    
    if(isLoading){
        // Could not figure out why postId was undefined. 
        // I was using router.query.postId insteat of router.query.postid
        //console.log('PostID==', postId)
        //console.log(router.query)
        return (
            <div>
                <p>postID = {postId}</p>
                <p>Loading.posts...</p>
            </div>
        )
    }

    if(!data){
        console.log('ERROR', error)
        return <Error statusCode={404} />
    }

    return (
        <div>
            <h1>{data?.title}</h1>
            <p>{data?.body}</p>
        </div>

    )


}


export default SinglePostPage;
