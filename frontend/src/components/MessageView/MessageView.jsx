import { useNavigate } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { IoMdSearch } from 'react-icons/io'
import { useState } from 'react'
import ContactCard from '../ContactCard/ContactCard'
import ChatBox from '../ChatBox/CHatBox'



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
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <ContactCard avatarUrl={'null'} />
                    <p className="mt-auto text-center text-xs text-blue-400">
                        -End of contacts-
                    </p>
                </div>
            </div>
            <div className="h-screen">
                <ChatBox avatarUrl={avatarUrl} />
            </div>
        </div>
    )
}

export default MessageView
