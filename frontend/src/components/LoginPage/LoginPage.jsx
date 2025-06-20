import AuthNavBar from '../AuthNavBar/AuthNavBar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            const data = await response.json()
            localStorage.setItem('userToken', `${data.token}`)
            console.log(data)
            console.log(localStorage.getItem('userToken'))
            console.log(response)
            if (response.ok) {
                navigate('/feed')
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
                    <form className="mx-5 flex min-h-7/12 w-full max-w-md flex-col justify-between rounded-lg bg-blue-900 p-5 text-white">
                        <div>
                            <p className="text-2xl font-bold">Log In</p>
                            <p className="text-sm">Log in to jump back in!</p>
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
                            <div className="flex flex-col">
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
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={handleLoginButton}
                                className="h-10 rounded-lg bg-blue-500 px-3 py-1 text-black"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
