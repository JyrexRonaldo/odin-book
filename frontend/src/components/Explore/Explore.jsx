import { useEffect } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Explore() {
    const [exploreData, setExploreData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/explore`,
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
                setExploreData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate])

    // console.log(exploreData)

    return (
        <>
            <PostListComponent data={exploreData} />
        </>
    )
}

export default Explore
