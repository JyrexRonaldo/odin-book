import { useState, useEffect } from 'react'
import { ImHeart } from 'react-icons/im'
import Textarea from '../Textarea/Textarea'
import { intervalToDuration } from 'date-fns'

function Comment({
    id,
    authorName,
    commentBody,
    authorUsername,
    createdAt,
    setCommentTriggerRender,
    setTriggerRender,
    isLikedByUser,
    commentLikeCount,
    authorImg,
}) {
    const [show, setShow] = useState(false)
    const [likedComment, setLikedComment] = useState(false)
    const [commentLikes, setCommentLikes] = useState(commentLikeCount)

    async function handleDeleteButton() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/comments`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        commentId: id,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setCommentTriggerRender(self.crypto.randomUUID())
            setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditButton() {
        setShow(!show)
    }

    async function handleLikeButton() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/comment-likes`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        commentId: id,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            if (data.message === 'Comment liked') {
                commentLikeCount = data.commentLikeCount._count.likedBy
                setLikedComment(true)
            } else {
                commentLikeCount = data.commentLikeCount._count.likedBy
                setLikedComment(false)
            }
            // console.log(likeCount)
            setCommentLikes(commentLikeCount)
        } catch (error) {
            console.log(error)
        }

        // setLikedComment(!likedComment)
    }

    useEffect(() => {
        if (isLikedByUser) {
            setLikedComment(true)
        } else {
            setLikedComment(false)
        }
    }, [isLikedByUser])

    let heartIconStyle = 'size-6'

    if (likedComment) {
        heartIconStyle = 'size-6 text-red-600'
    }

    const durationSinceCreated = intervalToDuration({
        start: new Date(createdAt),
        end: new Date(),
    })

    const time = Object.keys(durationSinceCreated)[0]

    let durationText = `0s`

    if (time) {
        durationText = `${durationSinceCreated[time]}${time.slice(0, 1)}`
    }

    return (
        <>
            <div className="flex items-center gap-1 p-2.5">
                <div className="shrink-0">
                    {authorImg ? (
                        <img
                            src={authorImg}
                            className="size-12 rounded-full"
                            alt="author image"
                        />
                    ) : (
                        <img
                            src="/morty.jpg"
                            className="size-12 rounded-full"
                            alt="author image"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-2 text-xs">
                        <p>{authorName}</p>
                        <p>{durationText}</p>
                    </div>
                    <div>
                        <p className="text-sm">{commentBody}</p>
                    </div>
                    {authorUsername === localStorage.getItem('username') && (
                        <div className="flex gap-2 text-xs">
                            <button
                                className="cursor-pointer"
                                onClick={handleEditButton}
                            >
                                Edit
                            </button>
                            <button
                                className="cursor-pointer text-red-600"
                                onClick={handleDeleteButton}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLikeButton}
                    className="ml-auto flex cursor-pointer flex-col items-center gap-1"
                >
                    <ImHeart className={`${heartIconStyle}`} />
                    <p>{commentLikes}</p>
                </button>
            </div>
            {show && (
                <Textarea placeholderText={"What's on your mind"}></Textarea>
            )}
        </>
    )
}

export default Comment
