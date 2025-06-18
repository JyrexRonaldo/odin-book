function AuthNavBar() {
    return (
        <>
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                <h1 className="text-3xl font-bold text-white">Book</h1>
                <div className="flex gap-3">
                    <button className="rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500">
                        Log In
                    </button>
                    <button className="rounded-lg bg-blue-500 px-3 py-1 hover:bg-blue-600">
                        Sign Up
                    </button>
                </div>
            </nav>
        </>
    )
}

export default AuthNavBar
