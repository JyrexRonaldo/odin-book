import AuthNavBar from '../AuthNavBar/AuthNavBar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate()

    function handleEmailInput(e) {
        setEmail(e.target.value)
    }
    function handlePasswordInput(e) {
        setPassword(e.target.value)
    }

    async function handleLoginButton() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/auth/signin`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            )

            if (response.status === 404) {
                setErrorMessage('User not found')
            }

            if (response.status === 401) {
                setErrorMessage('Invalid password')
            }

            const data = await response.json()
            localStorage.setItem('userToken', `${data.token}`)
            localStorage.setItem('userId', `${data.userId}`)
            localStorage.setItem('username', `${data.username}`)
            localStorage.setItem('avatar', `${data.avatarUrl}`)
            localStorage.setItem('name', `${data.name}`)
            localStorage.setItem('bio', `${data.bio}`)
            if (response.ok) {
                setSuccessMessage(data.message)
                setErrorMessage('')
                setTimeout(() => {
                    navigate('/explore')
                }, 250)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogInAsGuest() {
        try {
            const guestName = `John Doe`
            const guestUsername = `User-${self.crypto.randomUUID()}`

            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/auth/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: guestName,
                        username: guestUsername,
                        email: `${self.crypto.randomUUID()}@gmail.com `,
                        password: `Aa123`,
                    }),
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

    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <AuthNavBar />
                <div className="flex items-center justify-center">
                    <form className="mx-5 flex w-full max-w-md flex-col gap-10 rounded-lg bg-blue-900 p-5 text-white">
                        <div>
                            <p className="text-2xl font-bold">Log In</p>
                            <p className="text-sm">Log in to jump back in!</p>
                        </div>
                        <div className="flex flex-col gap-5">
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
                                    autoComplete="email"
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
                                    autoComplete="current-password"
                                    className="min-h-10 rounded-lg bg-white px-3 text-black"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                />
                                <p className="text-sm text-green-400">
                                    {successMessage}
                                </p>
                                <p className="text-sm text-red-400">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <button
                                type="button"
                                onClick={handleLoginButton}
                                className="h-10 w-xs cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-black"
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                onClick={handleLogInAsGuest}
                                className="w-xs rounded-lg bg-white p-3 text-black"
                            >
                                Log in as Guest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
