import { IoMdSearch } from 'react-icons/io'
import UserCard from '../UserCard/UserCard'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import StylesContext from '../StylesContext/StylesContext'

function UserList() {
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [triggerRender, setTriggerRender] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const navigate = useNavigate()
    const { handleFindUsersStyles } = useContext(StylesContext)

    function handleSearchInput(e) {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        handleFindUsersStyles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
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

                if (response.status === 401) {
                    navigate('/login')
                }

                const data = await response.json()
                setUserData(data)
            } catch (error) {
                console.log(error)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [navigate, triggerRender])

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

    const filteredCards = userData
        .filter((data) => {
            if (data.username.startsWith(searchInput)) {
                return true
            } else {
                return false
            }
        })
        .map((data) => {
            let isFollowedValue = null
            const followerCount = data._count.followedBy
            data.followedBy.forEach((element) => {
                if (element.followingId === +localStorage.getItem('userId')) {
                    isFollowedValue = true
                } else {
                    isFollowedValue = false
                }
            })

            return (
                <UserCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    username={data.username}
                    bio={data.bio}
                    isFollowed={isFollowedValue}
                    setTriggerRender={setTriggerRender}
                    followerCount={followerCount}
                />
            )
        })

    const userCards = userData.map((data) => {
        let isFollowedValue = null
        const followerCount = data._count.followedBy
        data.followedBy.forEach((element) => {
            if (element.followingId === +localStorage.getItem('userId')) {
                isFollowedValue = true
            } else {
                isFollowedValue = false
            }
        })

        return (
            <UserCard
                key={data.id}
                id={data.id}
                name={data.name}
                username={data.username}
                bio={data.bio}
                isFollowed={isFollowedValue}
                setTriggerRender={setTriggerRender}
                followerCount={followerCount}
            />
        )
    })

    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5 self-start text-white">
            <div className="flex w-80 justify-center rounded-lg bg-blue-900 p-3">
                <input
                    onChange={handleSearchInput}
                    value={searchInput}
                    className="mr-3 w-full bg-blue-900"
                    type="search"
                    name="userSearch"
                    id=""
                    placeholder="Search by Username"
                />
                <IoMdSearch className="size-7" />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-8 lg:min-w-149">
                {searchInput ? filteredCards : userCards}
            </div>
        </div>
    )
}

export default UserList
