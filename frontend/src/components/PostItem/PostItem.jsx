import { useEffect, useContext, useState } from 'react'
import StylesContext from '../../contexts/StylesContext/StylesContext'
import { useNavigate, useParams } from 'react-router-dom'
import PostComponent from '../PostComponent/PostComponent'

function PostItem() {
    const [postData, setPostData] = useState([])
    const [triggerRender, setTriggerRender] = useState(0)
    const navigate = useNavigate()
    const { handleUserProfileStyles } = useContext(StylesContext)

    const { postId } = useParams()
    // console.log(postId)

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/login')
        }
        handleUserProfileStyles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/posts/${postId}`,
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
                setPostData([data])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate, triggerRender, postId])

    function getPostCards(data) {
        const dataCards = data.map((dataItem) => {
            let isLikedByUser = false
            const likeArray = []
            dataItem.likedBy.forEach((item) => {
                likeArray.push(item.userId)
            })
            if (likeArray.includes(+localStorage.getItem('userId'))) {
                isLikedByUser = 
                true
            }

            return (
                <PostComponent
                    key={dataItem.id}
                    id={dataItem.id}
                    name={dataItem.author.name}
                    username={dataItem.author.username}
                    body={dataItem.body}
                    createdAt={dataItem.createdAt}
                    commentCount={dataItem._count.comments}
                    likeCount={dataItem._count.likedBy}
                    isLikedByUser={isLikedByUser}
                    setTriggerRender={setTriggerRender}
                    postImgUrl={dataItem.postImageUrl}
                    authorImg={dataItem.author.avatarImageUrl}
                />
            )
        })

        return dataCards
    }

    const dataCards = getPostCards(postData)

    return (
        <div className="flex w-full max-w-xl flex-col gap-5 rounded-lg lg:min-w-md">
            {dataCards}
        </div>
    )
}

export default PostItem
