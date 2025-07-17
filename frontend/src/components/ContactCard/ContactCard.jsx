import { BiSolidUserCircle } from 'react-icons/bi'

function ContactCard({ avatarUrl }) {
    return (
        <div className="flex h-24 max-w-full items-center gap-3 border-b border-blue-600/70 px-6">
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
                <p className="font-extrabold">Name</p>
                <p className="font-extralight">@Username</p>
                <p className="text-xs">Date Joined</p>
            </div>
        </div>
    )
}

export default ContactCard
