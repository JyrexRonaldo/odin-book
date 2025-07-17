import { BiSolidUserCircle } from 'react-icons/bi'

function ContactCard({ avatarUrl }) {
    return (
        <div className="flex h-24 max-w-full items-center gap-3 bg-fuchsia-700 px-6">
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
                <p>Name</p>
                <p>Username</p>
                <p>Date Joined</p>
            </div>
        </div>
    )
}

export default ContactCard
