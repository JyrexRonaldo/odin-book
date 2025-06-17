function AccountEdit() {
    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white *:rounded-2xl *:bg-blue-900 *:p-5">
            <div className="flex flex-col gap-5">
                <p className="text-2xl font-bold">Edit Profile Info</p>
                <div className="flex flex-col items-center text-center">
                    {/* <img src="" alt="" /> */}
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-30"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <p>Update Profile Image</p>
                    <p>Should be less than 5mb</p>
                    <p>Recommended size:</p>
                    <p>500px x 500px</p>
                    <div>
                        <p>Drag Here to Upload Media</p>
                        <img src="" alt="" />
                        <button>Browse Files</button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        className="bg-blue-800 px-5 py-2.5"
                        type="text"
                        id="name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className="min-h-28 max-w-2xl resize-y rounded-lg bg-blue-800 p-5"
                        name="bio"
                        id="bio"
                    ></textarea>
                </div>
                <button className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-5">
                <p className="text-2xl font-bold">Change Username</p>
                <div className="text-xl">
                    <p>Current Username:</p>
                    <p>ron</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">New Username</label>
                    <input
                        className="bg-blue-800 px-5 py-2.5"
                        placeholder="Your new username"
                        type="text"
                        id="username"
                        name="username"
                    />
                </div>
                <button className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-5">
                <p className="text-2xl font-bold">Change Password</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        className="bg-blue-800 px-5 py-2.5"
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        className="bg-blue-800 px-5 py-2.5"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        className="bg-blue-800 px-5 py-2.5"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                    />
                </div>
                <button className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-3">
                <div>
                    <p className="text-2xl font-bold text-rose-700">
                        Danger Zone
                    </p>
                </div>
                <div>
                    <p className="font-bold">Delete Account</p>
                    <p>All your comments, posts, and account will be deleted</p>
                </div>
                <button className="cursor-pointer self-start rounded-lg bg-red-500 px-3 py-1 text-xl text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default AccountEdit
