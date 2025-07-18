import { MdRssFeed } from 'react-icons/md'
import { MdOutlineExplore } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi2'
import { ImHeart } from 'react-icons/im'
import { BiPlusCircle } from 'react-icons/bi'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import RenderContext from '../RenderContext/RenderContext'
import StylesContext from '../StylesContext/StylesContext'

function App() {
    const [forceUpdate, setForceUpdate] = useState('update')
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

    const navigate = useNavigate()

    const buttonColorVariants = {
        default: '',
        selected: 'bg-white text-black',
    }

    const iconStyleVariants = {
        default: '',
        selected: 'bg-white text-black',
    }

    function handleCreatePost() {
        navigate('/post/create')
    }

    function handleFeedStyles() {
        setButtonStyles(['selected', 'default', 'default', 'default'])
        setIconStyles(['selected', 'default', 'default', 'default'])
    }

    function handleExploreStyles() {
        setButtonStyles(['default', 'selected', 'default', 'default'])
        setIconStyles(['default', 'selected', 'default', 'default'])
    }

    function handleLikesStyles() {
        setButtonStyles(['default', 'default', 'default', 'selected'])
        setIconStyles(['default', 'default', 'default', 'selected'])
    }

    function handleFindUsersStyles() {
        setButtonStyles(['default', 'default', 'selected', 'default'])
        setIconStyles(['default', 'default', 'selected', 'default'])
    }

    function handleUserProfileStyles() {
        setButtonStyles(['default', 'default', 'default', 'default'])
        setIconStyles(['default', 'default', 'default', 'default'])
    }

    function handleFeed() {
        handleFeedStyles()
        navigate('/feed')
    }

    function handleExplore() {
        handleExploreStyles()
        navigate('/explore')
    }

    function handleFindUsers() {
        handleFindUsersStyles()
        navigate('/users')
    }

    function handleLikes() {
        handleLikesStyles()
        navigate('/likes')
    }

    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <Navbar />
                <div className="flex items-center justify-center lg:grid lg:grid-cols-[3fr_4fr_3fr]">
                    <div className="flex h-full items-start justify-end p-5 max-lg:hidden">
                        <div className="fixed flex min-h-36 flex-col gap-8 rounded-lg bg-blue-900 p-5 text-2xl font-bold text-white max-lg:hidden">
                            <div className="flex flex-col gap-4 *:flex *:h-12 *:w-52 *:items-center *:justify-between *:rounded-lg *:px-3.5 *:text-left">
                                <button
                                    onClick={handleFeed}
                                    className={`${buttonColorVariants[buttonStyles[0]]}`}
                                >
                                    Feed
                                    <MdRssFeed className="size-8" />
                                </button>
                                <button
                                    onClick={handleExplore}
                                    className={`${buttonColorVariants[buttonStyles[1]]}`}
                                >
                                    Explore
                                    <MdOutlineExplore className="size-8" />
                                </button>
                                <button
                                    onClick={handleFindUsers}
                                    className={`${buttonColorVariants[buttonStyles[2]]}`}
                                >
                                    Find Users
                                    <HiUsers className="size-8" />
                                </button>
                                <button
                                    onClick={handleLikes}
                                    className={`${buttonColorVariants[buttonStyles[3]]}`}
                                >
                                    Likes
                                    <ImHeart className="size-8" />
                                </button>
                            </div>
                            <button
                                onClick={handleCreatePost}
                                className="mt-14 h-12 w-52 rounded-lg bg-blue-500 px-3.5 text-left"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 flex h-full w-full items-start justify-start p-5 pb-30 max-lg:justify-center">
                        <StylesContext.Provider
                            value={{
                                handleFeedStyles,
                                handleExploreStyles,
                                handleFindUsersStyles,
                                handleLikesStyles,
                                handleUserProfileStyles,
                            }}
                        >
                            <RenderContext.Provider
                                value={{ forceUpdate, setForceUpdate }}
                            >
                                <Outlet />
                            </RenderContext.Provider>
                        </StylesContext.Provider>
                    </div>
                </div>
                <div className="fixed bottom-0 min-h-24 w-full overflow-hidden lg:hidden">
                    <div className="flex min-h-24 w-full items-center justify-between self-end overflow-hidden bg-blue-800/30 px-5 text-white backdrop-blur-md *:flex *:size-16 *:cursor-pointer *:items-center *:justify-center *:rounded-[50%]">
                        <button
                            onClick={handleFeed}
                            className={`${iconStyleVariants[iconStyles[0]]}`}
                        >
                            <MdRssFeed className="size-8" />
                        </button>
                        <button
                            onClick={handleExplore}
                            className={`${iconStyleVariants[iconStyles[1]]}`}
                        >
                            <MdOutlineExplore className="size-8" />
                        </button>
                        <button
                            onClick={handleCreatePost}
                            className="bg-blue-500"
                        >
                            <BiPlusCircle className="size-8" />
                        </button>
                        <button
                            onClick={handleFindUsers}
                            className={`${iconStyleVariants[iconStyles[2]]}`}
                        >
                            <HiUsers className="size-8" />
                        </button>
                        <button
                            onClick={handleLikes}
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
