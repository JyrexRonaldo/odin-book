import { useNavigate } from 'react-router-dom'

function AuthNavBar() {
    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login')
    }

    function handleSignup() {
        navigate('/signup')
    }

    return (
        <>
            <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                <h1 className="text-3xl font-bold text-white">Book</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleLogin}
                        className="cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500 hover:text-blue-400 active:text-blue-600"
                    >
                        Log In
                    </button>
                    <button
                        onClick={handleSignup}
                        className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 hover:bg-blue-400 active:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </div>
            </nav>
        </>
    )
}

export default AuthNavBar
