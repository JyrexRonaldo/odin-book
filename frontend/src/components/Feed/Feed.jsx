import { useEffect, useState, useContext } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'
import StylesContext from '../StylesContext/StylesContext'

function Feed() {
    const [feedData, setFeedData] = useState([])
    const [triggerRender, setTriggerRender] = useState(0)
    const navigate = useNavigate()
    const { handleFeedStyles } = useContext(StylesContext)

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/login')
        }
        handleFeedStyles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
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

                if (response.status === 401) {
                    navigate('/login')
                }
                const data = await response.json()
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
