import { BiSolidUserCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function UserCard({ id, name, username, bio, isFollowed, setTriggerRender, followerCount, avatarUrl }) {
    const navigate = useNavigate()

    async function handleSendRequest() {
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
            setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    function handlerUserView() {
        navigate(`/users/${username}`)
    }

    return (
        <div className="flex h-auto w-full max-w-80 flex-col items-center gap-2 rounded-xl bg-blue-900 p-5 text-center text-white">
            {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="size-17 rounded-full object-cover"
                            />
                        ) : (
                            <BiSolidUserCircle className="size-17" />
                        )}

            <p className="text-2xl font-extrabold">{name}</p>
            <p className="text-xs">{followerCount} followers</p>
            <p>@{username}</p>
            <p>{bio}</p>
            <div className="flex gap-3">
                {isFollowed ? (
                    <button
                        onClick={handleSendRequest}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                    >
                        Unfollow
                        <FaMinus />
                    </button>
                ) : (
                    <button
                        onClick={handleSendRequest}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black"
                    >
                        Follow
                        <FaPlus />
                    </button>
                )}
                <button
                    onClick={handlerUserView}
                    className="cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                >
                    View
                </button>
            </div>
        </div>
    )
}

export default UserCard
