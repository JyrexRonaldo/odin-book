function App() {
    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                    <div className="flex gap-3">
                        <button className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4">
                            Home
                        </button>
                        <button className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1">
                            Create Post
                        </button>
                        <button className="cursor-pointer">
                            <p className="text-white">username</p>
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center">
                    <div className="min-h-24 w-full self-end overflow-hidden lg:hidden">
                        <div className="flex min-h-24 w-full items-center justify-between self-end overflow-hidden bg-blue-500/30 px-5 backdrop-blur-md">
                            <button className="size-16 rounded-[50%] bg-blue-500"></button>
                            <button className="size-16 rounded-[50%] bg-blue-500"></button>
                            <button className="size-16 rounded-[50%] bg-blue-500"></button>
                            <button className="size-16 rounded-[50%] bg-blue-500"></button>
                            <button className="size-16 rounded-[50%] bg-blue-500"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
