import { useNavigate } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import { IoMdSearch } from 'react-icons/io'
import { useState } from 'react'

function MessageView() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')
    const avatarUrl = localStorage.getItem('avatar')

    function handleSearchInput(e) {
        setSearchInput(e.target.value)
    }

    function handleHomeButton() {
        navigate('/explore')
    }

    return (
        <div className="h-screen bg-red-600 text-white lg:grid lg:grid-cols-[1fr_2fr]">
            <div className="h-screen bg-green-600">
                <div className="justiy grid grid-cols-[min-content_auto_min-content] items-center gap-4 bg-amber-800 p-4">
                    {avatarUrl === 'null' ? (
                        <BiSolidUserCircle className="size-14" />
                    ) : (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="size-14 rounded-full object-cover"
                        />
                    )}
                    <div className="flex justify-center rounded-lg bg-blue-900 p-3">
                        <input
                            onChange={handleSearchInput}
                            value={searchInput}
                            className="mr-3 w-full bg-blue-900"
                            type="search"
                            name="userSearch"
                            id=""
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
                <div>
                    Contact cards
                </div>
            </div>
            <div className="h-screen bg-yellow-600 max-lg:hidden"> Hello</div>
        </div>
    )
}

export default MessageView
