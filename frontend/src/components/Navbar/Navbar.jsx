import { useNavigate, Link } from 'react-router-dom'
import { BiSolidUserCircle } from 'react-icons/bi'
import Dropdown from '../Dropdown/Dropdown'
import { useState } from 'react'

function Navbar() {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false)

    function handleCreatePost() {
        navigate('/post/create')
    }

    function handleHomeButton() {
        navigate('/')
    }

    function handleDropdown() {
        setShowDropdown(!showDropdown)
    }
    return (
        <>
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                </Link>
                <div className="flex gap-3">
                    <button
                        onClick={handleHomeButton}
                        className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4 max-md:hidden"
                    >
                        Home
                    </button>
                    <button
                        onClick={handleCreatePost}
                        className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 max-md:hidden"
                    >
                        Create Post
                    </button>
                    <div onClick={handleDropdown} className="relative flex cursor-pointer items-center gap-3 text-white">
                        <p className="">username</p>
                        <BiSolidUserCircle className="size-9" />
                        {showDropdown && <Dropdown />}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
