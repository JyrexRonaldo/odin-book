import { ImHeart } from 'react-icons/im'
import { FaComment } from 'react-icons/fa'
import { TbArrowForwardUp } from 'react-icons/tb'
import { useState } from 'react'
import { useEffect } from 'react'
import { format } from 'date-fns'

function PostComponent({
    id,
    name,
    username,
    body,
    createdAt,
    commentCount,
    likeCount,
    isLikedByUser,
    setTriggerRender
}) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(likeCount)

    createdAt = format(createdAt, 'MMM d, yyyy, h:m a')

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
            // console.log(data)
            if (data.message === 'Post liked') {
                likeCount = data.likeCount._count.likedBy
                setLiked(true)
            } else {
                likeCount = data.likeCount._count.likedBy
                setLiked(false)
            }
            // console.log(likeCount)
            setLikes(likeCount)
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

    return (
        <>
            <div className="flex flex-col gap-2 rounded-xl bg-blue-900 py-5 text-white">
                <div className="flex items-center gap-2.5 px-2.5">
                    <img
                        src="/morty.jpg"
                        className="size-16 rounded-full"
                        alt=""
                    />
                    <div>
                        <p className="font-bold">{name}</p>
                        <p>@{username}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <img src="/mass-effect.jpeg" alt="" />
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
                    <button className="ml-auto flex cursor-pointer items-center gap-1">
                        <TbArrowForwardUp className="size-7" />
                    </button>
                </div>
                <div>
                    <p className="px-2.5 text-xs">{createdAt}</p>
                </div>
                <div className="flex gap-4 px-2.5 text-sm">
                    <a href="">View Comments...</a>
                    {username === localStorage.getItem('username') && (
                        <button
                            onClick={handleDeletePost}
                            className="text-red-600"
                        >
                            Delete Post
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default PostComponent
