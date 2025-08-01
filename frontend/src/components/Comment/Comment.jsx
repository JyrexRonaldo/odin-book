import { useState } from 'react'
import { ImHeart } from 'react-icons/im'
import Textarea from '../Textarea/Textarea'
import { intervalToDuration } from 'date-fns'
import { BiSolidUserCircle } from 'react-icons/bi'

function Comment({
    id,
    authorName,
    commentBody,
    authorUsername,
    createdAt,
    // setCommentTriggerRender,
    // setTriggerRender,
    isLikedByUser,
    commentLikeCount,
    authorImg,
    commentsData,
    setCommentsData,
    commentPosition,
}) {
    const [show, setShow] = useState(false)
    const [likedComment, setLikedComment] = useState(isLikedByUser)
    // const [commentLikes, setCommentLikes] = useState(commentLikeCount)
    const [commentText, setCommentText] = useState('')

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

            const responseData = await response.json()
            console.log(responseData)
            console.log(commentsData)
            const remainingData = commentsData.filter(
                (data) => responseData.id !== data.id
            )
            console.log(remainingData)
            setCommentsData(remainingData)
            // setCommentTriggerRender(self.crypto.randomUUID())
            // setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditButton() {
        setShow(!show)
        setCommentText(commentBody)
    }

    function handleCommentField(e) {
        setCommentText(e.target.value)
    }

    async function handleEditComment(commentPosition) {
        if (show === true && commentText === '') {
            return
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/comments`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        commentId: id,
                        editComment: commentText,
                    }),
                }
            )

            const responseData = await response.json()
            commentsData.splice(commentPosition, 1, responseData)
            setCommentsData([...commentsData])
            // setCommentTriggerRender(self.crypto.randomUUID())
            // setTriggerRender(self.crypto.randomUUID())
            setCommentText('')
            setShow(false)
        } catch (error) {
            console.log(error)
        }
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
                // commentLikeCount = data.commentLikeCount._count.likedBy
                // setCommentLikes(commentLikes + 1)
                setLikedComment(true)
            } else  if (data.message === 'Comment unliked') {
                // commentLikeCount = data.commentLikeCount._count.likedBy
                // setCommentLikes(commentLikes - 1)
                setLikedComment(false)
            }
            // setCommentLikes(commentLikeCount)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (isLikedByUser) {
    //         setLikedComment(true)
    //         setCommentLikes(commentLikes + 1)
    //     } else {
    //         setLikedComment(false)
    //     }

    // }, [isLikedByUser])

    let heartIconStyle = 'size-6'
    let  commentTotalCount = commentLikeCount

    if (likedComment) {
        heartIconStyle = 'size-6 text-red-600'
        commentTotalCount += 1
        // setCommentLikes(commentLikes + 1)
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
                        <BiSolidUserCircle className="size-12 rounded-full" />
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
                                {show ? 'Cancel' : 'Edit'}
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
                    <p>{commentTotalCount}</p>
                </button>
            </div>
            {show && (
                <Textarea
                    sendButtonHandler={() => {
                        handleEditComment(commentPosition)
                    }}
                    textFieldHandler={handleCommentField}
                    textFieldValue={commentText}
                    placeholderText={'Edit comment'}
                ></Textarea>
            )}
        </>
    )
}

export default Comment
