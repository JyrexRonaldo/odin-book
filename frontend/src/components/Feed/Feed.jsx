import { useEffect, useState } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'

function Feed() {
    const [feedData, setFeedData] = useState([])
    const [triggerRender, setTriggerRender] = useState(0)
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

                // console.log(response.status)

                if (response.status === 401) {
                    navigate('/login')
                }
                const data = await response.json()
                // console.log(data)
                setFeedData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate, triggerRender])

    return (
        <>
            <PostListComponent
                data={feedData}
                setTriggerRender={setTriggerRender}
            />
        </>
    )
}

export default Feed
