import { useEffect, useState } from 'react'
import Comment from '../Comment/Comment'

// const useCommentsData = (postId, newComment, deletedCommentId) => {
//     const [commentsData, setCommenttsData] = useState(null)
//     const [error, setError] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         fetch(`${import.meta.env.VITE_HOME_DOMAIN}/${postId}/comments`)
//             .then((response) => {
//                 if (response.status >= 400) {
//                     throw new Error('server error')
//                 }
//                 return response.json()
//             })
//             .then((response) => setCommenttsData(response))
//             .catch((error) => setError(error))
//             .finally(() => setLoading(false))
//     }, [postId, newComment, deletedCommentId])

//     return { commentsData, error, loading }
// }

function CommentList({
    postId,
    commentTriggerRender,
    setCommentTriggerRender,
    setTriggerRender,
    // newComment = null,
    // deletedCommentId = null,
    // setDeletedCommentId,
}) {
    const [commentsData, setCommentsData] = useState([])

    useEffect(() => {
        async function fetchData() {
            // console.log(localStorage.getItem('userToken'))
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/comments/${postId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${localStorage.getItem('userToken')}`,
                        },
                    }
                )

                // console.log(response.status)

                if (response.status === 401) {
                    // navigate('/login')
                }
                const data = await response.json()
                console.log(data)
                setCommentsData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [postId, commentTriggerRender])

    // const { commentsData, error, loading } = useCommentsData(
    //     postId,
    //     newComment,
    //     deletedCommentId
    // )

    // const [show, setShow] = useState(false)

    // if (loading)
    //     return (
    //         <div className="mt-52 flex items-center justify-center">
    //             <p>Loading...</p>
    //         </div>
    //     )
    // if (error)
    //     return (
    //         <div className="mt-52 flex items-center justify-center">
    //             <p>A network error was encountered</p>
    //         </div>
    //     )

    // const commentCards = commentsData
    //     .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    //     .map((comment) => {
    //         return (
    //             <Comment
    //                 key={comment.id}
    //                 author={comment.author.username}
    //                 authorId={comment.authorId}
    //                 createdAt={comment.createdAt}
    //                 comment={comment.comment}
    //                 commentId={comment.id}
    //                 postId={comment.postId}
    //                 setDeletedCommentId={setDeletedCommentId}
    //                 showId={comment.id}
    //                 show={show}
    //                 setShow={setShow}
    //             />
    //         )
    //     })

    // const commentCards = Array.from({ length: 23 }).map((element, index) => (
    //     <Comment key={index} />
    // ))

    const commentCards = commentsData.map((dataItem) => {
        let isLikedByUser = false
        const likeArray = []
        dataItem.likedBy.forEach((item) => {
            likeArray.push(item.userId)
        })
        if (likeArray.includes(+localStorage.getItem('userId'))) {
            isLikedByUser = true
        }
        return (
            <Comment
                key={dataItem.id}
                id={dataItem.id}
                authorName={dataItem.author.name}
                commentBody={dataItem.comment}
                authorUsername={dataItem.author.username}
                createdAt={dataItem.createdAt}
                setCommentTriggerRender={setCommentTriggerRender}
                setTriggerRender={setTriggerRender}
                commentLikeCount={dataItem._count.likedBy}
                isLikedByUser={isLikedByUser}
            />
        )
    })

    return <div>{commentCards}</div>
}

export default CommentList
