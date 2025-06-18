import UserCard from '../UserCard/UserCard'

function UserList() {
    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5 self-start text-white">
            <div className="flex w-80 justify-center rounded-lg p-3 bg-blue-900">
                <input
                    className="mr-3 w-full bg-blue-900"
                    type="search"
                    name="userSearch"
                    id=""
                    placeholder="Search by Username"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-8 lg:min-w-149">
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        </div>
    )
}

export default UserList
