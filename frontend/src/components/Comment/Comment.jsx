import { useState } from 'react'
import { ImHeart } from 'react-icons/im'
import Textarea from '../Textarea/Textarea'

function Comment() {
    const [show, setShow] = useState(false)
    const [liked, setLiked] = useState(false)

    function handleEditButton() {
        setShow(!show)
    }

    async function handleLikeButton() {
        // try {
        //     const response = await fetch(
        //         `${import.meta.env.VITE_HOME_DOMAIN}/likes`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: `${localStorage.getItem('userToken')}`,
        //             },
        //             body: JSON.stringify({
        //                 postId: id,
        //             }),
        //         }
        //     )

        //     const data = await response.json()
        //     // console.log(data)
        //     if (data.message === 'Post liked') {
        //         likeCount = data.likeCount._count.likedBy
        //         setLiked(true)
        //     } else {
        //         likeCount = data.likeCount._count.likedBy
        //         setLiked(false)
        //     }
        //     // console.log(likeCount)
        //     setLikes(likeCount)
        // } catch (error) {
        //     console.log(error)
        // }

        setLiked(!liked)
    }

    let heartIconStyle = 'size-6'

    if (liked) {
        heartIconStyle = 'size-6 text-red-600'
    }
    return (
        <>
            <div className="flex items-center p-2.5">
                <div>
                    <img
                        src="/morty.jpg"
                        className="size-12 rounded-full"
                        alt=""
                    />
                </div>
                <div>
                    <div className="flex gap-2 text-xs">
                        <p>Rick</p>
                        <p>2 seconds</p>
                    </div>
                    <div>
                        <p className="text-sm">Hello</p>
                    </div>
                    <div className="flex gap-2 text-xs">
                        <button onClick={handleEditButton}>Edit</button>
                        <button className="text-red-600">Delete</button>
                    </div>
                </div>
                <button
                    onClick={handleLikeButton}
                    className="ml-auto flex cursor-pointer flex-col items-center gap-1"
                >
                    <ImHeart className={`${heartIconStyle}`} />
                    <p>{'5'}</p>
                </button>
            </div>
            {show && <Textarea></Textarea>}
        </>
    )
}

export default Comment
