import PostComponent from '../PostComponent/PostComponent'

function UserProfile() {
    return (
        <div className="self-start mt-13 flex w-full max-w-xl flex-col gap-10 text-white *:rounded-2xl *:bg-blue-900 *:p-5">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-3 text-center">
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
                    <div>
                        <p>ron</p>
                        <p>@ron</p>
                    </div>
                    <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                        Follow
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="size-5"
                        >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>
                    </button>
                    <p>
                        Follow me and get to know me! We might end up best
                        friends!
                    </p>
                    <div className="flex gap-3">
                        <a className="flex gap-3" href="">
                            <p>Posts</p> <p>1</p>
                        </a>
                        <a className="flex gap-3" href="">
                            <p>Followers</p> <p>1</p>
                        </a>
                        <a className="flex gap-3" href="">
                            <p>Following</p> <p>1</p>
                        </a>
                    </div>
                </div>
            </div>
            <div>{/* <PostComponent /> */}</div>
        </div>
    )
}

export default UserProfile
