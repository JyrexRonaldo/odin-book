import { useState, useEffect, useContext } from 'react'
import PostListComponent from '../PostListComponent/PostListComponent'
import { useNavigate } from 'react-router-dom'
import StylesContext from '../../contexts/StylesContext/StylesContext'

function Likes() {
    const [likesData, setLikesData] = useState([])
    // const [triggerRender, setTriggerRender] = useState(0)
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
            }
        }
        fetchData()
    }, [navigate])

    return (
        <>
            <PostListComponent
                data={likesData}
                // setTriggerRender={setTriggerRender}
                setData={setLikesData}
            />
        </>
    )
}

export default Likes
