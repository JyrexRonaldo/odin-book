import { IoMdSearch } from 'react-icons/io'
import UserCard from '../UserCard/UserCard'

function UserList() {
    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5 self-start text-white">
            <div className="flex w-80 justify-center rounded-lg bg-blue-900 p-3">
                <input
                    className="mr-3 w-full bg-blue-900"
                    type="search"
                    name="userSearch"
                    id=""
                    placeholder="Search by Username"
                />
                <IoMdSearch className="size-7" />
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
