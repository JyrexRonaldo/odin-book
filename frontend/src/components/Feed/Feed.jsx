import { useEffect } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            // console.log(localStorage.getItem('userToken'))
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/feed`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `${localStorage.getItem('userToken')}`,
                        },
                    }
                )

                console.log(response.status)

                if (response.status === 401) {
                    navigate("/login")
                }

                const data = await response.json()

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, )

    return (
        <>
            <PostListComponent />
        </>
    )
}

export default Feed
