import { useNavigate } from 'react-router-dom'

function Dropdown() {
    const navigate = useNavigate()
    function handleProfile() {
        navigate('/users/1')
    }

    function handleSettings() {
        navigate('/account')
    }

    function handleLogout() {
        navigate('/login')
    }

    return (
        <>
            <div className="flex flex-col gap-2 w-37 rounded-xl bg-blue-900 p-5 absolute top-15 -left-6.5">
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
