import { Outlet } from 'react-router-dom'
import { MdRssFeed } from 'react-icons/md'
import { MdOutlineExplore } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi2'
import { ImHeart } from 'react-icons/im'
import { BiPlusCircle } from 'react-icons/bi'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useState } from 'react'

function App() {
    const [buttonStyles, setButtonStyles] = useState([
        'default',
        'default',
        'default',
        'default',
    ])

    const [iconStyles, setIconStyles] = useState([
        'default',
        'default',
        'default',
        'default',
    ])

    const buttonColorVariants = {
        default: '',
        selected: 'bg-white text-black',
    }

    const iconStyleVariants = {
        default: '',
        selected: 'bg-white text-black',
    }

    function handleSelect(e) {
        console.log(e.currentTarget.dataset.button)
        if (e.currentTarget.dataset.button === 'Feed') {
            setButtonStyles(['selected', 'default', 'default', 'default'])
        } else if (e.currentTarget.dataset.button === 'Explore') {
            setButtonStyles(['default', 'selected', 'default', 'default'])
        } else if (e.currentTarget.dataset.button === 'Find Users') {
            setButtonStyles(['default', 'default', 'selected', 'default'])
        } else if (e.currentTarget.dataset.button === 'Likes') {
            setButtonStyles(['default', 'default', 'default', 'selected'])
        }
    }

    function handleIconClick(e) {
        console.log(e.currentTarget.dataset.icon)
        if (e.currentTarget.dataset.icon === 'Feed') {
            setIconStyles(['selected', 'default', 'default', 'default'])
        } else if (e.currentTarget.dataset.icon === 'Explore') {
            setIconStyles(['default', 'selected', 'default', 'default'])
        } else if (e.currentTarget.dataset.icon === 'Find Users') {
            setIconStyles(['default', 'default', 'selected', 'default'])
        } else if (e.currentTarget.dataset.icon === 'Likes') {
            setIconStyles(['default', 'default', 'default', 'selected'])
        }
    }

    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <nav className="z-10 mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                    <div className="flex gap-3">
                        <button className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4 max-md:hidden">
                            Home
                        </button>
                        <button className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 max-md:hidden">
                            Create Post
                        </button>
                        <button className="flex cursor-pointer items-center gap-3 text-white">
                            <p className="">username</p>
                            <BiSolidUserCircle className="size-9" />
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center lg:grid lg:grid-cols-[3fr_4fr_3fr]">
                    <div className="flex h-full items-start justify-end p-5 max-lg:hidden">
                        <div className="fixed flex min-h-36 flex-col gap-8 rounded-lg bg-blue-900 p-5 text-2xl font-bold text-white max-lg:hidden">
                            <div className="flex flex-col gap-4 *:flex *:h-12 *:w-52 *:items-center *:justify-between *:rounded-lg *:px-3.5 *:text-left">
                                <button
                                    data-button="Feed"
                                    onClick={handleSelect}
                                    className={`${buttonColorVariants[buttonStyles[0]]}`}
                                >
                                    Feed
                                    <MdRssFeed className="size-8" />
                                </button>
                                <button
                                    data-button="Explore"
                                    onClick={handleSelect}
                                    className={`${buttonColorVariants[buttonStyles[1]]}`}
                                >
                                    Explore
                                    <MdOutlineExplore className="size-8" />
                                </button>
                                <button
                                    data-button="Find Users"
                                    onClick={handleSelect}
                                    className={`${buttonColorVariants[buttonStyles[2]]}`}
                                >
                                    Find Users
                                    <HiUsers className="size-8" />
                                </button>
                                <button
                                    data-button="Likes"
                                    onClick={handleSelect}
                                    className={`${buttonColorVariants[buttonStyles[3]]}`}
                                >
                                    Likes
                                    <ImHeart className="size-8" />
                                </button>
                            </div>
                            <button className="mt-14 h-12 w-52 rounded-lg bg-blue-500 px-3.5 text-left">
                                Create Post
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 flex h-full w-full items-start justify-start p-5 pb-30 max-lg:justify-center">
                        <Outlet />
                    </div>
                </div>
                <div className="fixed bottom-0 min-h-24 w-full overflow-hidden lg:hidden">
                    <div className="flex min-h-24 w-full items-center justify-between self-end overflow-hidden bg-blue-800/30 px-5 text-white backdrop-blur-md *:flex *:size-16 *:cursor-pointer *:items-center *:justify-center *:rounded-[50%]">
                        <button
                            data-icon="Feed"
                            onClick={handleIconClick}
                            className={`${iconStyleVariants[iconStyles[0]]}`}
                        >
                            <MdRssFeed className="size-8" />
                        </button>
                        <button
                            data-icon="Explore"
                            onClick={handleIconClick}
                            className={`${iconStyleVariants[iconStyles[1]]}`}
                        >
                            <MdOutlineExplore className="size-8" />
                        </button>
                        <button
                            data-icon="createPost"
                            onClick={handleIconClick}
                            className="bg-blue-500"
                        >
                            <BiPlusCircle className="size-8" />
                        </button>
                        <button
                            data-icon="Find Users"
                            onClick={handleIconClick}
                            className={`${iconStyleVariants[iconStyles[2]]}`}
                        >
                            <HiUsers className="size-8" />
                        </button>
                        <button
                            data-icon="Likes"
                            onClick={handleIconClick}
                            className={`${iconStyleVariants[iconStyles[3]]}`}
                        >
                            <ImHeart className="size-8" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
