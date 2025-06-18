import { BiSolidUserCircle } from 'react-icons/bi'

function UserCard() {
    return (
        <div className="flex h-auto w-full max-w-80 flex-col items-center gap-2 rounded-xl bg-blue-900 p-5 text-center text-white">
            <img src="" alt="" />
            <BiSolidUserCircle className="size-17" />

            <p className="text-2xl font-extrabold">jyrex</p>
            <p className="text-xs">5 followers</p>
            <p>@IAmJyrex</p>
            <p>
                The lead developer of Book. Plant guy, picks up the guitar from
                time to time.
            </p>
            <div className="flex gap-3">
                <button className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black">
                    Follow
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="size-5"
                    >
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                </button>
                <button className="cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500">
                    View
                </button>
            </div>
        </div>
    )
}

export default UserCard
