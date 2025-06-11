function LoginPage() {
    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                    <div className="flex gap-3">
                        <button className="rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500">
                            Sign In
                        </button>
                        <button className="rounded-lg bg-blue-500 px-3 py-1">
                            Sign Up
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center">
                    <div className="mx-5 flex min-h-7/12 w-full max-w-md flex-col justify-between rounded-lg bg-blue-900 p-5 text-white">
                        <div>
                            <p className="text-2xl font-bold">Sign In</p>
                            <p className="text-sm">Sign in to jump back in!</p>
                        </div>
                        <div className="self-center">
                            <button className="rounded-lg bg-white p-3 text-black">
                                Continue with Google
                            </button>
                        </div>
                        <div className="self-center">OR</div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                />
                            </div>
                        </div>
                        <div>
                            <button className="h-10 rounded-lg bg-blue-500 px-3 py-1 text-black">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
