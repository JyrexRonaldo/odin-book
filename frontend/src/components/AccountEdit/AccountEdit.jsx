import { useContext, useEffect, useState } from 'react'
import { BiSolidUserCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import RenderContext from '../RenderContext/RenderContext'
import { FaCloudUploadAlt } from 'react-icons/fa'
import supabase from '../../../supabase/supabase'

function AccountEdit() {
    const [name, setName] = useState(localStorage.getItem('name'))
    const [bio, setBio] = useState(localStorage.getItem('bio'))
    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [confirmDeleteText, setConfirmDeleteText] = useState('')
    const [selectedImgUrl, setSelectedImgUrl] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)
    const avatarUrl = localStorage.getItem('avatar')
    const { setForceUpdate } = useContext(RenderContext)
    let passwordVerification = null
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/login')
        }
    })

    function handleDeleteConfirmText(e) {
        setConfirmDeleteText(e.target.value)
    }

    async function handleDeleteConfirm() {
        if (confirmDeleteText !== 'delete my account') {
            return
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/users/${localStorage.getItem('username')}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                }
            )
            const data = await response.json()
            console.log(data)
            localStorage.clear()
            navigate('/signup')
        } catch (error) {
            console.log(error)
        }
    }

    function handleShowDeleteDialog(e) {
        console.log(e.target.dataset.dialog)
        if (e.target.dataset.dialog) {
            setShowDeleteDialog(!showDeleteDialog)
        }
    }

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

    async function handleProfileInfoEdit(changeType) {
        console.log(localStorage.getItem('username'))

        try {
            let imgPublicUrl = avatarUrl
            if (selectedImg) {
                const oldImgLink = localStorage.getItem('avatar')
                const oldFileName =
                    oldImgLink.split('/')[oldImgLink.split('/').length - 1]

                await supabase.storage
                    .from('avatars')
                    .remove([`avatar/${oldFileName}`])

                const currentImgName =
                    self.crypto.randomUUID() +
                    '.' +
                    selectedImg?.type.split('/')[1]
                const { data, error } = await supabase.storage
                    .from('odin-book')
                    .upload(`avatar/${currentImgName}`, selectedImg)

                if (error) {
                    throw error
                }

                const savedImg = data

                if (savedImg) {
                    const { data } = supabase.storage
                        .from('odin-book')
                        .getPublicUrl(`avatar/${currentImgName}`)

                    imgPublicUrl = data.publicUrl
                }
            }
            let updateData = {}

            if (changeType === 'profile') {
                updateData = { changeType, name, bio, imgPublicUrl }
            } else if (changeType === 'username') {
                updateData = { changeType, username }
            } else if (changeType === 'password') {
                updateData = { changeType, oldPassword, newPassword }
            }

            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/profile`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify(updateData),
                }
            )

            if (response.status === 401) {
                navigate('/login')
            }

            const responseData = await response.json()
            if (responseData.changeType === 'username') {
                localStorage.setItem('username', `${username}`)
                setForceUpdate({})
            }
            if (responseData.changeType === 'profile') {
                console.log(imgPublicUrl)
                localStorage.setItem('avatar', `${imgPublicUrl}`)
                localStorage.setItem('bio', `${name}`)
                localStorage.setItem('name', `${bio}`)
                setForceUpdate({})
            }
            // if (responseData.changeType === 'password') {
            //     resetPasswordInputs()
            // }
        } catch (error) {
            console.log(error)
        }
    }

    function handleImageSelector(e) {
        setSelectedImg(e.target.files[0])
        const file = e.target.files[0]
        if (file) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.addEventListener('load', function () {
                setSelectedImgUrl(this.result)
            })
        }
    }

    if (newPassword != confirmNewPassword) {
        passwordVerification = 'Password do not match!'
    } else {
        passwordVerification = null
    }

    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white">
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
                <p className="text-2xl font-bold">Edit Profile Info</p>
                <div className="flex flex-col items-center gap-2.5 text-center">
                    {/* <img src="" alt="" /> */}
                    <div>
                        {selectedImgUrl ? (
                            <img
                                src={selectedImgUrl}
                                alt="avatar"
                                className="size-30 rounded-full object-cover"
                            />
                        ) : avatarUrl === 'null' ? (
                            <BiSolidUserCircle className="size-30 rounded-full" />
                        ) : (
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className="size-30 rounded-full object-cover"
                            />
                        )}
                    </div>
                    <p className="font-extrabold">Update Profile Image</p>
                    <p>Should be less than 5mb</p>
                    <p>Recommended size:</p>
                    <p>500px x 500px</p>
                    <div className="relative flex flex-col items-center gap-2.5 rounded-lg bg-blue-500 p-2.5">
                        <p className="font-extrabold">
                            Drag Here to Upload Media
                        </p>
                        <FaCloudUploadAlt className="size-8" />
                        <label htmlFor="avatar">Browse Files</label>
                        <input
                            onChange={handleImageSelector}
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="absolute top-0 h-full w-full bg-red-500/0 text-fuchsia-800/0"
                        />
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
                <button
                    onClick={() => {
                        handleProfileInfoEdit('profile')
                    }}
                    className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600"
                    type="button"
                >
                    Save
                </button>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
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
                <button
                    onClick={() => {
                        handleProfileInfoEdit('username')
                    }}
                    className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600"
                    type="button"
                >
                    Save
                </button>
            </div>
            <form className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
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
                    <p className="text-sm text-red-400">
                        {passwordVerification}
                    </p>
                </div>
                <button
                    onClick={() => {
                        handleProfileInfoEdit('password')
                    }}
                    className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600"
                    type="button"
                >
                    Save
                </button>
            </form>
            <div className="flex flex-col gap-3 rounded-2xl bg-blue-900 p-5">
                <div>
                    <p className="text-2xl font-bold text-rose-700">
                        Danger Zone
                    </p>
                </div>
                <div>
                    <p className="font-bold">Delete Account</p>
                    <p>All your comments, posts, and account will be deleted</p>
                </div>
                <button
                    data-dialog
                    onClick={handleShowDeleteDialog}
                    className="cursor-pointer self-start rounded-lg bg-red-500 px-3 py-1 text-xl text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-700"
                >
                    Delete
                </button>
            </div>
            {showDeleteDialog && (
                <div
                    data-dialog
                    onClick={handleShowDeleteDialog}
                    className="fixed top-0 left-0 flex h-screen w-screen max-w-full items-center justify-center bg-black/20 max-lg:z-10"
                >
                    <div className="mx-5 flex min-h-4/12 w-full max-w-2xl flex-col justify-center gap-5 rounded-2xl bg-blue-900 p-5">
                        <p className="text-2xl font-extrabold">
                            Are you sure you want to delete your account?
                        </p>
                        <p>
                            This action is immediate and will permanently delete
                            all your posts and comments.
                        </p>
                        <p className="text-blue-400">
                            Type this below: delete my account
                        </p>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirm" className="font-extrabold">
                                Confirm
                            </label>
                            <input
                                onChange={handleDeleteConfirmText}
                                value={confirmDeleteText}
                                className="rounded-lg bg-white px-5 py-2.5 text-black"
                                type="text"
                                id="confirm"
                            />
                        </div>
                        <button
                            onClick={handleDeleteConfirm}
                            className="cursor-pointer self-start rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600"
                            type="button"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountEdit
