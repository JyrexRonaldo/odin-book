import { useState, useEffect, useContext } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'
import StylesContext from '../../contexts/StylesContext/StylesContext'

function Likes() {
    const [likesData, setLikesData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { handleLikesStyles } = useContext(StylesContext)

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/login')
        }
        handleLikesStyles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/likes`,
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
                setLikesData(data)
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
            <div className="flex w-full max-w-2xl justify-center">
                <p className="text-white">Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex w-full max-w-2xl justify-center">
                <p className="text-white">A network error was encounted</p>
            </div>
        )
    }

    if (likesData.length === 0) {
        return (
            <div className="flex w-full max-w-2xl justify-center">
                <p className="text-white">You haven't liked any posts</p>
            </div>
        )
    }

    return (
        <>
            <PostListComponent data={likesData} setData={setLikesData} />
        </>
    )
}

export default Likes
