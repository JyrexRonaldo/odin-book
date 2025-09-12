import { useNavigate, Link } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import Dropdown from '../Dropdown/Dropdown'
import { useState } from 'react'

function Navbar() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)
    const name = localStorage.getItem('name')
    const avatarUrl = localStorage.getItem('avatar')

    function handleCreatePost() {
        navigate('/post/create')
    }

    function handleHomeButton() {
        navigate('/explore')
    }

    function handleDropdown() {
        setShowDropdown(!showDropdown)
    }

    function handleMessenderButton() {
        navigate('/messenger')
    }

    return (
        <>
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                <Link to="/explore">
                    <h1 className="cursor-pointer text-3xl font-bold text-white">
                        Book
                    </h1>
                </Link>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleHomeButton}
                        className="cursor-pointer rounded-lg p-0 text-blue-500 hover:underline hover:underline-offset-4 max-md:hidden"
                    >
                        Home
                    </button>
                    <button
                        type="button"
                        onClick={handleMessenderButton}
                        className="cursor-pointer rounded-lg p-0 text-blue-500 hover:underline hover:underline-offset-4 "
                    >
                        Messenger
                    </button>
                    <button
                        onClick={handleCreatePost}
                        className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 max-md:hidden hover:bg-blue-400 active:bg-blue-600"
                    >
                        Create Post
                    </button>
                    <button
                        type="button"
                        onClick={handleDropdown}
                        className="relative flex cursor-pointer items-center gap-3 text-white"
                    >
                        <p className="max-w-28 truncate">{name}</p>
                        {avatarUrl === 'null' ? (
                            <BiSolidUserCircle className="size-9" />
                        ) : (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="size-9 rounded-full object-cover"
                            />
                        )}
                        {showDropdown && <Dropdown />}
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
