import { useNavigate } from 'react-router-dom'

function Dropdown() {
    const navigate = useNavigate()
    function handleProfile() {
        navigate('/users/1')
        navigate(`/users/${localStorage.getItem('username')}`)
    }

    function handleSettings() {
        navigate('/account')
    }

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <div className="absolute top-15 -left-20 flex w-37 flex-col gap-2 rounded-xl bg-blue-900 p-5">
                <button
                    onClick={handleProfile}
                    className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4"
                >
                    Your profile
                </button>
                <button
                    onClick={handleSettings}
                    className="cursor-pointer rounded-lg px-3 py-1 text-blue-500 hover:underline hover:underline-offset-4"
                >
                    Settings
                </button>
                <button
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default Dropdown
