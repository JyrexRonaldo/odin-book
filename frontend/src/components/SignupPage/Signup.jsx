import { useState } from 'react'
import AuthNavBar from '../AuthNavBar/AuthNavBar'
import { useNavigate } from 'react-router-dom'

function SignupPage() {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()
    let passwordVerification = null

    function handleNameInput(e) {
        setName(e.target.value)
    }
    function handleUsernameInput(e) {
        setUsername(e.target.value)
    }
    function handleEmailInput(e) {
        setEmail(e.target.value)
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPasswordInput(e) {
        setConfirmPassword(e.target.value)
    }

    async function handleSignUpButton() {
        if (email === '' || password === '' || name === '' || username === '' ) {
            setErrorMessage("Various fields cannot be empty")
            return
        }
        if (password !== confirmPassword) {
            return
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/auth/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, username, email, password }),
                }
            )

            const data = await response.json()
            localStorage.setItem('userToken', `${data.token}`)
            localStorage.setItem('userId', `${data.userId}`)
            localStorage.setItem('username', `${data.username}`)
            localStorage.setItem('avatar', `${data.avatarUrl}`)
            localStorage.setItem('name', `${data.name}`)
            localStorage.setItem('bio', `${data.bio}`)
            if (response.ok) {
                setSuccessMessage(data.message)
                setTimeout(() => {
                    navigate('/explore')
                }, 250)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (password != confirmPassword) {
        passwordVerification = 'Password do not match!'
    } else {
        passwordVerification = null
    }

    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <AuthNavBar />
                <div className="flex items-center justify-center">
                    <div className="mx-5 flex min-h-7/12 w-full max-w-md flex-col justify-between rounded-lg bg-blue-900 p-5 text-white">
                        <form className="flex flex-col gap-5">
                            <div>
                                <p className="text-2xl font-bold">Sign Up</p>
                                <p className="text-sm">
                                    Sign up to rock and roll!
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    onChange={handleNameInput}
                                    value={name}
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Display Name"
                                />
                                <p className="text-sm text-blue-400">
                                    This is your public display name.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    onChange={handleUsernameInput}
                                    value={username}
                                    autoComplete="username"
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                />
                                <p className="text-sm text-blue-400">
                                    This is a unique username that your friends
                                    can use to find you.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={handleEmailInput}
                                    value={email}
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    onChange={handlePasswordInput}
                                    value={password}
                                    autoComplete="new-password"
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    className="mb-1 font-bold"
                                    htmlFor="confirmPassword"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    onChange={handleConfirmPasswordInput}
                                    value={confirmPassword}
                                    autoComplete="new-password"
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                                <p className="text-sm text-red-400">
                                    {passwordVerification}
                                </p>
                                <p className="text-sm text-red-400">
                                    {errorMessage}
                                </p>
                                <p className="text-sm text-green-400">
                                    {successMessage}
                                </p>
                            </div>
                            <div>
                                <button
                                    onClick={handleSignUpButton}
                                    type="button"
                                    className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-black hover:bg-blue-600"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage
