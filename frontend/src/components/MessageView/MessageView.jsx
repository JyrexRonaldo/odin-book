import { useNavigate } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { IoMdSearch } from 'react-icons/io'
import ContactCard from '../ContactCard/ContactCard'
import ChatBox from '../ChatBox/CHatBox'
import { useState, useEffect } from 'react'
import TextInputContext from '../TextInputContext/TextInputContext'
import MessageBubbleTriggerContext from '../MessageBubbleTriggerContext/MessageBubbleTriggerContext'

function MessageView() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')
    const [contactAvatarUrl, setContactAvatarUrl] = useState('')
    const avatarUrl = localStorage.getItem('avatar')
    const [contacts, setContacts] = useState()
    const [name, setName] = useState('')
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [showChatBox, setShowChatBox] = useState(false)
    const [messageBody, setMessageBody] = useState('')
    const [messageBubbleTriggerRender, seMessageBubbleTriggerRender] =
        useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/users`,
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

                setContacts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate])

    async function createMessagHandler(e) {
        if (e.type === 'keyup' && e.key !== 'Enter') {
            return
        }
        if (messageBody.trim() === '') {
            return
        }
        console.log(e.type)
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/messages`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        messageBody,
                        receiverId: userId,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setMessageBody('')
            seMessageBubbleTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    function textInputFieldHandler(e) {
        setMessageBody(e.target.value)
    }

    function handleSearchInput(e) {
        setSearchInput(e.target.value)
    }

    function handleHomeButton() {
        navigate('/explore')
    }

    const userContactCardComponents = contacts
        ?.filter((user) => {
            if (user.id !== +localStorage.getItem('userId')) return true
        })
        .map((user) => {
            console.log(user)
            return (
                <ContactCard
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    dateJoined={user.dateJoined}
                    avatarUrl={user.avatarImageUrl}
                    setName={setName}
                    setUsername={setUsername}
                    setDateJoined={setDateJoined}
                    setUserId={setUserId}
                    setShowChatBox={setShowChatBox}
                    setContactAvatarUrl={setContactAvatarUrl}
                />
            )
        })

    console.log(messageBody)

    return (
        <div className="h-screen bg-[url('/wallpaper.jpeg')] bg-cover text-white lg:grid lg:grid-cols-[1fr_2fr]">
            <div className="flex h-screen flex-col border-r border-blue-600 bg-blue-950 max-lg:hidden">
                <div className="flex items-center gap-4 border-b border-blue-600 p-4">
                    {avatarUrl === 'null' ? (
                        <BiSolidUserCircle className="size-14 shrink-0" />
                    ) : (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="size-14 shrink-0 rounded-full object-cover"
                        />
                    )}
                    <div className="flex grow justify-center rounded-lg bg-blue-900/70 p-3">
                        <input
                            onChange={handleSearchInput}
                            value={searchInput}
                            className="mr-3 w-full focus:outline-none"
                            type="search"
                            name="userSearch"
                            id="userSearch"
                            placeholder="Search by Username"
                        />
                        <IoMdSearch className="size-7" />
                    </div>
                    <button
                        type="button"
                        onClick={handleHomeButton}
                        className="cursor-pointer rounded-lg p-0 text-blue-500 hover:underline hover:underline-offset-4 max-md:hidden"
                    >
                        Home
                    </button>
                </div>
                <div className="scrollbar-hide overflow-y-scroll">
                    {userContactCardComponents}
                    <p className="mt-auto text-center text-xs text-blue-400">
                        -End of contacts-
                    </p>
                </div>
            </div>
            <MessageBubbleTriggerContext.Provider
                value={{ messageBubbleTriggerRender }}
            >
                <TextInputContext.Provider
                    value={{
                        createMessagHandler,
                        textInputFieldHandler,
                        messageBody,
                    }}
                >
                    <div className="h-screen">
                        {showChatBox && (
                            <ChatBox
                                userId={userId}
                                avatarUrl={contactAvatarUrl}
                                // displayChatView={displayChatView}
                                name={name}
                                username={username}
                                dateJoined={dateJoined}
                            />
                        )}
                    </div>
                </TextInputContext.Provider>
            </MessageBubbleTriggerContext.Provider>
        </div>
    )
}

export default MessageView
