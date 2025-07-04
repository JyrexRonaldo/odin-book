import { useState } from 'react'
import { BiSolidUserCircle } from 'react-icons/bi'

function AccountEdit() {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')

    function handleNameInput(e) {
        setName(e.currentTarget.value)
    }

    function handleBioInput(e) {
        setBio(e.currentTarget.value)
    }

    function handleUsernameInput(e) {
        setUsername(e.currentTarget.value)
    }

    function handleOldPasswordInput(e) {
        setOldPassword(e.currentTarget.value)
    }

    function handleNewPasswordInput(e) {
        setnewPassword(e.currentTarget.value)
    }

    function handleConfirmNewPasswordInput(e) {
        setconfirmNewPassword(e.currentTarget.value)
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white *:rounded-2xl *:bg-blue-900 *:p-5">
            <div className="flex flex-col gap-5">
                <p className="text-2xl font-bold">Edit Profile Info</p>
                <div className="flex flex-col items-center text-center">
                    {/* <img src="" alt="" /> */}
                    <div>
                        <BiSolidUserCircle className="size-30" />
                    </div>
                    <p>Update Profile Image</p>
                    <p>Should be less than 5mb</p>
                    <p>Recommended size:</p>
                    <p>500px x 500px</p>
                    <div>
                        <p>Drag Here to Upload Media</p>
                        <img src={null} alt="" />
                        <button>Browse Files</button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleNameInput}
                        value={name}
                        className="rounded-lg bg-white px-5 py-2.5 text-black"
                        type="text"
                        id="name"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        onChange={handleBioInput}
                        value={bio}
                        className="min-h-28 max-w-2xl resize-y rounded-lg bg-white p-5 text-black"
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
                    <p>{localStorage.getItem('username')}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username">New Username</label>
                    <input
                        onChange={handleUsernameInput}
                        value={username}
                        className="rounded-lg bg-white px-5 py-2.5 text-black"
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
            <form className="flex flex-col gap-5">
                <input
                    className="hidden"
                    type="text"
                    name="email"
                    // value="..."
                    autoComplete="email"
                    // style="display: none;"
                ></input>
                <p className="text-2xl font-bold">Change Password</p>
                <div className="flex flex-col gap-2">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        onChange={handleOldPasswordInput}
                        value={oldPassword}
                        className="rounded-lg bg-white px-5 py-2.5 text-black"
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        autoComplete="current-password"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        onChange={handleNewPasswordInput}
                        value={newPassword}
                        className="rounded-lg bg-white px-5 py-2.5 text-black"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        autoComplete="new-password"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">
                        Confirm New Password
                    </label>
                    <input
                        onChange={handleConfirmNewPasswordInput}
                        value={confirmNewPassword}
                        className="rounded-lg bg-white px-5 py-2.5 text-black"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="new-password"
                    />
                </div>
                <button className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
                    Save
                </button>
            </form>
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
