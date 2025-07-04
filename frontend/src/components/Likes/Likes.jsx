import { useState } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Likes() {
    const [likesData, setLikesData] = useState([])
    const [triggerRender, setTriggerRender] = useState(0)
    const navigate = useNavigate()

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
            }
        }
        fetchData()
    }, [navigate, triggerRender])

    return (
        <>
            <PostListComponent
                data={likesData}
                setTriggerRender={setTriggerRender}
            />
        </>
    )
}

export default Likes
