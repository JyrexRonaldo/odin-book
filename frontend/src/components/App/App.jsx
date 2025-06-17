import { Outlet } from 'react-router-dom'

function App() {
    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                    <div className="flex gap-3">
                        <button className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4 max-md:hidden">
                            Home
                        </button>
                        <button className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 max-md:hidden">
                            Create Post
                        </button>
                        <button className="cursor-pointer">
                            <p className="text-white">username</p>
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center lg:grid lg:grid-cols-[3fr_4fr_3fr]">
                    <div className="flex h-full items-start justify-end p-5 max-lg:hidden">
                        <div className="flex min-h-36 flex-col gap-8 rounded-lg bg-blue-900 p-5 text-2xl font-bold text-white max-lg:hidden">
                            <div className="flex flex-col gap-4 *:h-12 *:w-52 *:rounded-lg *:px-3.5 *:text-left">
                                <button>Feed</button>
                                <button>Explore</button>
                                <button>Find Users</button>
                                <button>Likes</button>
                            </div>
                            <button className="mt-14 h-12 w-52 rounded-lg bg-blue-500 px-3.5 text-left">
                                Create Post
                            </button>
                        </div>
                    </div>
                    <div className="flex h-full w-full items-center justify-center p-5 mb-26">
                        <Outlet />
                    </div>
                </div>
                <div className="fixed min-h-24 w-full bottom-0 overflow-hidden lg:hidden">
                    <div className="flex min-h-24 w-full items-center justify-between self-end overflow-hidden bg-blue-800/30 px-5 backdrop-blur-md *:size-16 *:cursor-pointer *:rounded-[50%] *:bg-blue-500">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
