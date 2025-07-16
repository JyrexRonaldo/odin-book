import { ImHeart } from 'react-icons/im'
import { FaComment } from 'react-icons/fa'
import { TbArrowForwardUp } from 'react-icons/tb'
import { IoCloseSharp } from 'react-icons/io5'
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { BiSolidUserCircle } from 'react-icons/bi'
import Textarea from '../Textarea/Textarea'
import CommentList from '../CommentList/CommentList'

function PostComponent({
    id,
    name,
    username,
    body,
    createdAt,
    commentCount,
    likeCount,
    isLikedByUser,
    setTriggerRender,
    postImgUrl,
    authorImg,
}) {
    const [showComment, setShowComment] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(likeCount)
    const [commentText, setCommentText] = useState('')
    const [commentTriggerRender, setCommentTriggerRender] = useState(null)

    function handleShowComment(e) {
        if (e.target.dataset.comment) {
            setShowComment(!showComment)
        }
    }

    createdAt = format(createdAt, 'MMM d, yyyy, hh:mm a')

    async function handleLikeButton() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/likes`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        postId: id,
                    }),
                }
            )

            const data = await response.json()
            if (data.message === 'Post liked') {
                setLiked(true)
            } else {
                setLiked(false)
            }
            likeCount = data.likeCount._count.likedBy
            setLikes(likeCount)
            setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeletePost() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/posts`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        postId: id,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSendComment() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/comments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        postId: id,
                        comment: commentText,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setCommentTriggerRender(self.crypto.randomUUID())
            setTriggerRender(self.crypto.randomUUID())
            setCommentText('')
        } catch (error) {
            console.log(error)
        }
    }

    function handleCommentField(e) {
        setCommentText(e.target.value)
    }

    useEffect(() => {
        if (isLikedByUser) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [isLikedByUser])

    let heartIconStyle = 'size-6'

    if (liked) {
        heartIconStyle = 'size-6 text-red-600'
    }

    function handleShareButton() {
        navigator.clipboard.writeText(`${window.location.origin}/posts/${id}`)
        //  console.log(`${window.location.origin}/posts/${id}`);
    }

    return (
        <>
            <div className="flex flex-col gap-2 rounded-xl bg-blue-900 py-5 text-white">
                <div className="flex items-center gap-2.5 px-2.5">
                    {authorImg ? (
                        <img
                            src={authorImg}
                            className="size-16 rounded-full"
                            alt="author"
                        />
                    ) : (
                        <BiSolidUserCircle className="size-16 rounded-full" />
                    )}
                    <div>
                        <p className="font-bold">{name}</p>
                        <p>@{username}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {postImgUrl && (
                        <img
                            className="max-h-96 object-cover"
                            src={postImgUrl}
                            alt="post image"
                        />
                    )}
                    <p className="px-2.5">{body}</p>
                </div>
                <div className="flex gap-2 px-2.5">
                    <button
                        onClick={handleLikeButton}
                        className="flex cursor-pointer items-center gap-1"
                    >
                        <ImHeart className={`${heartIconStyle}`} />
                        <p>{likes}</p>
                    </button>
                    <button className="flex cursor-pointer items-center gap-1">
                        <FaComment className="size-6" />
                        <p>{commentCount}</p>
                    </button>
                    <button
                        onClick={handleShareButton}
                        className="ml-auto flex cursor-pointer items-center gap-1"
                    >
                        <TbArrowForwardUp onClick={handleShareButton} className="size-7" />
                    </button>
                </div>
                <div>
                    <p className="px-2.5 text-xs">{createdAt}</p>
                </div>
                <div className="flex gap-4 px-2.5 text-sm">
                    <button
                        data-comment
                        onClick={handleShowComment}
                        type="button"
                        className="cursor-pointer"
                    >
                        View Comments...
                    </button>
                    {username === localStorage.getItem('username') && (
                        <button
                            onClick={handleDeletePost}
                            className="cursor-pointer text-red-600"
                        >
                            Delete Post
                        </button>
                    )}
                </div>
                {showComment && (
                    <div
                        data-comment
                        onClick={handleShowComment}
                        className="fixed top-0 left-0 flex h-screen w-screen max-w-full items-center justify-center bg-red-700/0 max-lg:z-10"
                    >
                        <div className="h-8/12 w-full rounded-lg bg-blue-800 max-lg:self-end lg:grid lg:max-w-9/12 lg:grid-cols-[6fr_5fr]">
                            <div className="flex items-center justify-center bg-black max-lg:hidden">
                                {postImgUrl &&  <img
                                    className="max-h-96 w-full object-contain max-lg:hidden"
                                    src={postImgUrl}
                                    alt="post image"
                                />}
                            </div>
                            <div className="flex flex-col overflow-auto bg-blue-800 max-lg:h-full">
                                <div className="sticky top-0 flex justify-between bg-blue-800 p-2.5">
                                    <p className="text-2xl font-extrabold">
                                        Comments
                                    </p>
                                    <button
                                        data-comment
                                        type="button"
                                        onClick={handleShowComment}
                                        className="cursor-pointer"
                                    >
                                        <IoCloseSharp
                                            data-comment
                                            className="size-8"
                                        />
                                    </button>
                                </div>
                                <CommentList
                                    postId={id}
                                    commentTriggerRender={commentTriggerRender}
                                    setCommentTriggerRender={
                                        setCommentTriggerRender
                                    }
                                    setTriggerRender={setTriggerRender}
                                />
                                <p className="text-center text-xs text-blue-400">
                                    -End of comments-
                                </p>
                                <Textarea
                                    sendButtonHandler={handleSendComment}
                                    textFieldHandler={handleCommentField}
                                    textFieldValue={commentText}
                                    placeholderText={'Any comments? 😎'}
                                ></Textarea>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PostComponent
