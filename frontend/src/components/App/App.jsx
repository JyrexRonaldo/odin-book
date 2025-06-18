import { Outlet } from 'react-router-dom'
import { MdRssFeed } from 'react-icons/md'
import { MdOutlineExplore } from 'react-icons/md'
import { HiUsers } from 'react-icons/hi2'
import { ImHeart } from 'react-icons/im'
import { BiPlusCircle } from 'react-icons/bi'
import { BiSolidUserCircle } from 'react-icons/bi'

function App() {
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
                        <button className="cursor-pointer flex gap-3 items-center text-white">
                            <p className="">username</p>
                            <BiSolidUserCircle className="size-9" />
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center lg:grid lg:grid-cols-[3fr_4fr_3fr]">
                    <div className="flex h-full items-start justify-end p-5 max-lg:hidden">
                        <div className="fixed flex min-h-36 flex-col gap-8 rounded-lg bg-blue-900 p-5 text-2xl font-bold text-white max-lg:hidden">
                            <div className="flex flex-col gap-4 *:flex *:h-12 *:w-52 *:justify-between *:rounded-lg *:px-3.5 *:text-left">
                                <button>
                                    Feed <MdRssFeed className="size-8" />
                                </button>
                                <button>
                                    Explore{' '}
                                    <MdOutlineExplore className="size-8" />
                                </button>
                                <button>
                                    Find Users <HiUsers className="size-8" />
                                </button>
                                <button>
                                    Likes <ImHeart className="size-8" />
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
                        <button>
                            <MdRssFeed className="size-8" />
                        </button>
                        <button>
                            <MdOutlineExplore className="size-8" />
                        </button>
                        <button className="bg-blue-500">
                            <BiPlusCircle className="size-8" />
                        </button>
                        <button>
                            <HiUsers className="size-8" />
                        </button>
                        <button>
                            <ImHeart className="size-8" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
