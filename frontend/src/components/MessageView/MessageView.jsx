import { useNavigate } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { IoMdSearch } from 'react-icons/io'
import ContactCard from '../ContactCard/ContactCard'
import ChatBox from '../ChatBox/ChatBox'
import { useState, useEffect } from 'react'
import TextInputContext from '../TextInputContext/TextInputContext'
import MessageBubbleTriggerContext from '../MessageBubbleTriggerContext/MessageBubbleTriggerContext'

function MessageView() {
    const navigate = useNavigate()
    const [contactAvatarUrl, setContactAvatarUrl] = useState('')
    const avatarUrl = localStorage.getItem('avatar')
    const [contacts, setContacts] = useState()
    const [name, setName] = useState('')
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [showChatBox, setShowChatBox] = useState(false)
    const [messageBody, setMessageBody] = useState('')
    const [contactSearchInput, setContactSearchInput] = useState('')
    const [messageId, setMessageId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [messageBubbleTriggerRender, setMessageBubbleTriggerRender] =
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
        let method = null
        let requestbody = null
        if (isEdit) {
            method = 'PUT'
            requestbody = {
                messageBody,
                messageId,
            }
        } else {
            method = 'POST'
            requestbody = {
                messageBody,
                receiverId: userId,
            }
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/messages`,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify(requestbody),
                }
            )

            const data = await response.json()
            console.log(data)
            setMessageBody('')
            if (isEdit) {
                setIsEdit(false)
            }
            setMessageBubbleTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    function textInputFieldHandler(e) {
        setMessageBody(e.target.value)
    }

    function handleSearchInput(e) {
        setContactSearchInput(e.target.value)
    }

    function handleHomeButton() {
        navigate('/explore')
    }

    const filteredContacts = contacts
        ?.filter((user) => {
            if (user.id !== +localStorage.getItem('userId')) return true
        })
        .filter((data) => {
            if (data.username.startsWith(contactSearchInput)) {
                return true
            } else {
                return false
            }
        })
        .map((user) => {
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

    const userContactCardComponents = contacts
        ?.filter((user) => {
            if (user.id !== +localStorage.getItem('userId')) return true
        })
        .map((user) => {
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

    const contactListStyles = {
        chatBoxClosed:
            'flex h-screen flex-col border-r border-blue-600 bg-blue-950',
        chatBoxOpened:
            'flex h-screen flex-col border-r border-blue-600 bg-blue-950 max-lg:hidden',
    }

    let mobileViewStyles = 'chatBoxClosed'

    if (showChatBox) {
        mobileViewStyles = 'chatBoxOpened'
    }

    return (
        <div className="h-screen bg-[url('/wallpaper.jpeg')] bg-cover text-white lg:grid lg:grid-cols-[1fr_2fr]">
            <div className={`${contactListStyles[mobileViewStyles]}`}>
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
                            value={contactSearchInput}
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
                        className="cursor-pointer rounded-lg p-0 text-blue-500 hover:underline hover:underline-offset-4"
                    >
                        Home
                    </button>
                </div>
                <div className="scrollbar-hide overflow-y-scroll">
                    {contactSearchInput
                        ? filteredContacts
                        : userContactCardComponents}
                    <p className="mt-auto text-center text-xs text-blue-400">
                        -End of contacts-
                    </p>
                </div>
            </div>
            <div className="h-screen">
                <MessageBubbleTriggerContext.Provider
                    value={{
                        messageBubbleTriggerRender,
                        setMessageBubbleTriggerRender,
                    }}
                >
                    <TextInputContext.Provider
                        value={{
                            createMessagHandler,
                            textInputFieldHandler,
                            messageBody,
                            setMessageBody,
                            setMessageId,
                            isEdit,
                            setIsEdit,
                        }}
                    >
                        {showChatBox && (
                            <ChatBox
                                contactId={userId}
                                avatarUrl={contactAvatarUrl}
                                // displayChatView={displayChatView}
                                name={name}
                                username={username}
                                dateJoined={dateJoined}
                                setShowChatBox={setShowChatBox}
                            />
                        )}
                    </TextInputContext.Provider>
                </MessageBubbleTriggerContext.Provider>
            </div>
        </div>
    )
}

export default MessageView
