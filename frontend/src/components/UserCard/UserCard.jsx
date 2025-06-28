import { BiSolidUserCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'

function UserCard({ id, name, username, bio, isFollowed, setTriggerRender }) {
    async function handleSendRequest(e) {
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
                        followeeId: `${e.currentTarget.dataset.id}`,
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

    return (
        <div className="flex h-auto w-full max-w-80 flex-col items-center gap-2 rounded-xl bg-blue-900 p-5 text-center text-white">
            <img src={null} alt="" />
            <BiSolidUserCircle className="size-17" />

            <p className="text-2xl font-extrabold">{name}</p>
            <p className="text-xs">5 followers</p>
            <p>@{username}</p>
            <p>{bio}</p>
            <div className="flex gap-3">
                {isFollowed ? (
                    <button
                        onClick={handleSendRequest}
                        data-id={id}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                    >
                        Follow
                        <FaMinus />
                    </button>
                ) : (
                    <button
                        onClick={handleSendRequest}
                        data-id={id}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black"
                    >
                        Follow
                        <FaPlus />
                    </button>
                )}
                <button className="cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500">
                    View
                </button>
            </div>
        </div>
    )
}

export default UserCard
