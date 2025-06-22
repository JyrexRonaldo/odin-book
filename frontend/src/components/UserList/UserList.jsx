import { IoMdSearch } from 'react-icons/io'
import UserCard from '../UserCard/UserCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserList() {
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            // console.log(localStorage.getItem('userToken'))
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/users`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${localStorage.getItem('userToken')}`,
                        },
                    }
                )

                // console.log(response.status)

                if (response.status === 401) {
                    navigate('/login')
                }

                const data = await response.json()

                // console.log(data)
                setUserData(data)
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [navigate])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>A network error was encounted</p>
            </div>
        )
    }

    const userCards = userData.map((data) => {
        return (
            <UserCard
                key={data.id}
                id={data.id}
                name={data.name}
                username={data.username}
                bio={data.bio}
            />
        )
    })

    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5 self-start text-white">
            <div className="flex w-80 justify-center rounded-lg bg-blue-900 p-3">
                <input
                    className="mr-3 w-full bg-blue-900"
                    type="search"
                    name="userSearch"
                    id=""
                    placeholder="Search by Username"
                />
                <IoMdSearch className="size-7" />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-8 lg:min-w-149">
                {userCards}
            </div>
        </div>
    )
}

export default UserList
