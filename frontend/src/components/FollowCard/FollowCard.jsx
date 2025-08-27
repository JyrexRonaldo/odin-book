import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useState } from 'react'

function FollowCard({
    id,
    name,
    username,
    bio,
    following,
    followedBy,
    isFollowed,
    // setTriggerRender,
    avatarUrl,
}) {
    const [isUserFollowed, setIsUserFollowed] = useState(isFollowed)
    const [followingNumber, setFollowingNumber] = useState(following)
    const [followByNumber, setFollowByNumber] = useState(followedBy)
    
    async function handleUserFollow() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        followeeId: `${id}`,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setFollowByNumber(followByNumber + 1)
            setIsUserFollowed(true)
            if (id === +localStorage.getItem('userId')) {
                setFollowingNumber(followingNumber + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleUserUnFollow() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/users`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        followeeId: `${id}`,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setFollowByNumber(followByNumber - 1)
            // setFollowerNumbers(followerNumbers - 1)
            setIsUserFollowed(false)
            if (id === +localStorage.getItem('userId')) {
                setFollowingNumber(followingNumber - 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-blue-900 px-5 py-5 text-white">
            <div className="flex w-full max-w-full items-center justify-between">
                <div className="flex items-center gap-2.5">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            className="size-16 rounded-full"
                            alt=""
                        />
                    ) : (
                        <BiSolidUserCircle className="size-16 rounded-full" />
                    )}
                    <div>
                        <p className="font-bold">{name}</p>
                        <p>@{username}</p>
                    </div>
                </div>
                {isUserFollowed ? (
                    <button
                        onClick={handleUserUnFollow}
                        className="mr-2.5 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                    >
                        Unfollow
                        <FaMinus />
                    </button>
                ) : (
                    <button
                        onClick={handleUserFollow}
                        className="mr-2.5 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black"
                    >
                        Follow
                        <FaPlus />
                    </button>
                )}
            </div>
            <div className="flex gap-3 self-start text-xs">
                <p>Followers:  {followByNumber}</p>
                <p>Following:  {followingNumber}</p>
            </div>
            <div className="self-start">
                <p>{bio}</p>
            </div>
        </div>
    )
}

export default FollowCard
