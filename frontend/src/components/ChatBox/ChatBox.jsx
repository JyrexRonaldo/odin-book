import MessageBubble from '../MessageBubble/MessageBubble'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { BiSolidUserCircle } from 'react-icons/bi'
import TextInput from '../TextInput/TextInput'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import MessageBubbleTriggerContext from '../MessageBubbleTriggerContext/MessageBubbleTriggerContext'

function ChatBox({
    avatarUrl,
    // displayChatView,
    name,
    username,
    dateJoined,
    userId,
}) {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const { messageBubbleTriggerRender } = useContext(
        MessageBubbleTriggerContext
    )

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/messages/${userId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${localStorage.getItem('userToken')}`,
                        },
                    }
                )

                if (response.status === 401) {
                    navigate('/login')
                }
                const data = await response.json()
                setMessages(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate, userId, messageBubbleTriggerRender])

    const messageComponents = messages?.map((data) => {
        return <MessageBubble key={data.id} message={data.message} />
    })

    return (
        <div className="flex h-full flex-col justify-between bg-blue-950/60">
            <div className="grid grid-cols-[auto_1fr] bg-blue-900">
                <button className="flex min-w-23 items-center justify-center lg:hidden">
                    <MdOutlineKeyboardBackspace className="size-8" />
                </button>
                <div className="flex h-24 max-w-full items-center gap-3 px-6">
                    {avatarUrl === 'null' ? (
                        <BiSolidUserCircle className="size-18" />
                    ) : (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="size-14 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <p className="font-extrabold">{name}</p>
                        <p className="text-xs font-extralight">{`@${username}`}</p>
                        <p className="text-xs">Joined {dateJoined}</p>
                    </div>
                </div>
            </div>
            <div className="scrollbar-hide flex h-full flex-col items-end gap-2 overflow-y-auto px-4">
                {messageComponents}
            </div>
            <div>
                <TextInput />
            </div>
        </div>
    )
}

export default ChatBox
