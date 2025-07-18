import { BiSolidUserCircle } from 'react-icons/bi'
import { format } from 'date-fns'

function ContactCard({ name, username, dateJoined, avatarUrl }) {

    dateJoined =  format(dateJoined, 'MMM d, yyyy, hh:mm a')

    return (
        <div className="flex h-24 max-w-full items-center gap-3 border-b border-blue-600/70 px-6 hover:bg-blue-900">
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
                <p className="font-extralight text-xs">{`@${username}`}</p>
                <p className="text-xs">Joined {dateJoined}</p>
            </div>
        </div>
    )
}

export default ContactCard
