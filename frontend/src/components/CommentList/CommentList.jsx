import { useEffect, useState } from 'react'
import Comment from '../Comment/Comment'

function CommentList({
    postId,
    commentTriggerRender,
    setCommentTriggerRender,
    setTriggerRender,
}) {
    const [commentsData, setCommentsData] = useState([])

    useEffect(() => {
        async function fetchData() {
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

                if (response.status === 401) {
                    // navigate('/login')
                }
                const data = await response.json()
                // console.log(data)
                setCommentsData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [postId, commentTriggerRender])

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
                authorImg={dataItem.author.avatarImageUrl}
            />
        )
    })

    return <div>{commentCards}</div>
}

export default CommentList
