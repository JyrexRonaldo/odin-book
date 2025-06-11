function SignupPage() {
    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                    <h1 className="text-3xl font-bold text-white">Book</h1>
                    <div className="flex gap-3">
                        <button className="rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500">
                            Sign In
                        </button>
                        <button className="rounded-lg bg-blue-500 px-3 py-1 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                            Sign Up
                        </button>
                    </div>
                </nav>
                <div className="flex items-center justify-center">
                    <div className="mx-5 flex min-h-7/12 w-full max-w-md flex-col justify-between rounded-lg bg-blue-900 p-5 text-white">
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-2xl font-bold">Sign In</p>
                                <p className="text-sm">
                                    Sign up to rock and roll!
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Display Name"
                                />
                                <p className="text-sm text-blue-500">
                                    This is your public display name.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                />
                                <p className="text-sm text-blue-500">
                                    This is a unique username that your friends
                                    can use to find you.
                                </p>
                            </div>
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
                            <div className="flex flex-col">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <div>
                                <button className="rounded-lg bg-blue-500 px-3 py-1 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage
