import { useEffect } from 'react'
import Comment from '../Comment/Comment'

function CommentList({
    postId,
    commentsData,
    setCommentsData,
}) {    

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
    }, [postId, setCommentsData])

    const commentCards = commentsData.map((dataItem, index) => {
        let isLikedByUser = false
        const likeArray = []
        let commentCount = dataItem._count.likedBy
        dataItem.likedBy.forEach((item) => {
            likeArray.push(item.userId)
        })
        if (likeArray.includes(+localStorage.getItem('userId'))) {
            isLikedByUser = true
            commentCount -= 1
        }
        return (
            <Comment
                key={dataItem.id}
                id={dataItem.id}
                authorName={dataItem.author.name}
                commentBody={dataItem.comment}
                authorUsername={dataItem.author.username}
                createdAt={dataItem.createdAt}
                commentLikeCount={commentCount}
                isLikedByUser={isLikedByUser}
                authorImg={dataItem.author.avatarImageUrl}
                commentsData={commentsData}
                setCommentsData={setCommentsData}
                commentPosition={index}
            />
        )
    })

    return <div>{commentCards}</div>
}

export default CommentList
