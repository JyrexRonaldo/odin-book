import { BiSolidUserCircle } from 'react-icons/bi'
import { format } from 'date-fns'

function ContactCard({
    id,
    name,
    username,
    dateJoined,
    avatarUrl,
    setName,
    setUsername,
    setDateJoined,
    setUserId,
    setShowChatBox,
    setContactAvatarUrl,
    selectedContactId,
    setSelectedContactId,
}) {
    dateJoined = format(dateJoined, 'MMM d, yyyy')

    function handleChatView() {
        setName(name)
        setUsername(username)
        setDateJoined(dateJoined)
        setUserId(id)
        setContactAvatarUrl(avatarUrl)
        setShowChatBox(true)
        setSelectedContactId(id)
    }

    const selectedStyles = {
        default:
            'flex h-24 max-w-full items-center gap-3 border-b border-blue-600/70 px-6 hover:bg-blue-900',
        selected:
            'flex h-24 max-w-full items-center gap-3 border-b border-blue-600/70 bg-blue-900 px-6',
    }

    let selectedStyle = null

    if (selectedContactId === id) {
        selectedStyle = 'selected'
    } else {
        selectedStyle = 'default'
    }

    return (
        <div
            onClick={handleChatView}
            className={`${selectedStyles[selectedStyle]}`}
        >
            {avatarUrl === null ? (
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
    )
}

export default ContactCard
