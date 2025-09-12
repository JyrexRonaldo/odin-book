import { useEffect, useState, useContext } from 'react'
import PostComponent from '../PostComponent/PostComponent'
import { BiSolidUserCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { useParams, useNavigate } from 'react-router-dom'
import FollowCard from '../FollowCard/FollowCard'
import StylesContext from '../../contexts/StylesContext/StylesContext'

function UserProfile() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [profileData, setProfileData] = useState([])
    const [show, setShow] = useState([true, false, false])
    const [isUserFollowed, setIsUserFollowed] = useState(null)
    const [followerNumbers, setFollowerNumbers] = useState(null)
    const [followingNumber, setFollowingNumber] = useState(null)
    // const [triggerRender, setTriggerRender] = useState(0)
    const { handleUserProfileStyles } = useContext(StylesContext)

    useEffect(() => {
        if (localStorage.getItem('username') === 'undefined') {
            navigate('/login')
        }

        handleUserProfileStyles()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_HOME_DOMAIN}/users/${username}`,
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
                setProfileData(data)
                let isFollowed = data.followedBy?.some((element) => {
                    return (
                        element.following.id === +localStorage.getItem('userId')
                    )
                })
                setIsUserFollowed(isFollowed)
                setFollowerNumbers(data._count?.followedBy)
                setFollowingNumber(data._count?.following)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [
        navigate,
        username,
        // triggerRender
    ])

    function handleTabView(tabName) {
        if (tabName === 'post') {
            setShow([true, false, false])
        } else if (tabName === 'followers') {
            setShow([false, true, false])
        } else {
            setShow([false, false, true])
        }
    }

    async function handleUserFollow() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        followeeId: `${profileData.id}`,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setFollowerNumbers(followerNumbers + 1)
            setIsUserFollowed(true)
            if (username === localStorage.getItem("username")) {
                setFollowingNumber(followingNumber + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleUserUnFollow() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/users`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        followeeId: `${profileData.id}`,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setFollowerNumbers(followerNumbers - 1)
            setIsUserFollowed(false)
            if (username === localStorage.getItem("username")) {
                setFollowingNumber(followingNumber - 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postCount = profileData._count?.posts
    // const follwersCount = profileData._count?.followedBy
    // const followingCount = profileData._count?.following

    const postsData = profileData?.posts

    const followerData = profileData?.followedBy?.map(
        (dataItem) => dataItem.following
    )

    const followingData = profileData?.following?.map(
        (dataItem) => dataItem.followedBy
    )

    const followerCards = followerData?.map((dataItem) => {
        let isFollowedValue = dataItem.followedBy.forEach((element) => {
            return element.followingId === +localStorage.getItem('userId')
        })
        return (
            <FollowCard
                key={dataItem.id}
                id={dataItem.id}
                name={dataItem.name}
                username={dataItem.username}
                bio={dataItem.bio}
                following={dataItem._count.following}
                followedBy={dataItem._count.followedBy}
                // setTriggerRender={setTriggerRender}
                isFollowed={isFollowedValue}
                avatarUrl={dataItem.avatarImageUrl}
            />
        )
    })

    const followingCards = followingData?.map((dataItem) => {
        // console.log(dataItem)
        let isFollowedValue = dataItem.followedBy.some((element) => {
            return element.followingId === +localStorage.getItem('userId')
        })
        return (
            <FollowCard
                key={dataItem.id}
                id={dataItem.id}
                name={dataItem.name}
                username={dataItem.username}
                bio={dataItem.bio}
                following={dataItem._count.following}
                followedBy={dataItem._count.followedBy}
                isFollowed={isFollowedValue}
                avatarUrl={dataItem.avatarImageUrl}
            />
        )
    })

    const postCards = postsData?.map((dataItem) => {
        let isLikedByUser = false
        const likeArray = []
        dataItem.likedBy.forEach((item) => {
            likeArray.push(item.userId)
        })
        if (likeArray.includes(+localStorage.getItem('userId'))) {
            isLikedByUser = true
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
                postImgUrl={dataItem.postImageUrl}
                authorImg={dataItem.author.avatarImageUrl}
            />
        )
    })

    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white">
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div>
                        {profileData.avatarImageUrl === null ? (
                            <BiSolidUserCircle className="size-30" />
                        ) : (
                            <img
                                src={profileData.avatarImageUrl}
                                alt="avatar"
                                className="size-30 rounded-full object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <p>{profileData.name}</p>
                        <p>@{profileData.username}</p>
                    </div>
                    {isUserFollowed ? (
                        <button
                            onClick={handleUserUnFollow}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500 hover:text-blue-400 active:text-blue-600"
                        >
                            Unfollow
                            <FaMinus />
                        </button>
                    ) : (
                        <button
                            onClick={handleUserFollow}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black hover:bg-blue-400 active:bg-blue-600"
                        >
                            Follow
                            <FaPlus />
                        </button>
                    )}
                    <p>{profileData.bio}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                handleTabView('post')
                            }}
                            className="flex cursor-pointer gap-3"
                        >
                            <p>Posts</p> <p>{postCount}</p>
                        </button>
                        <button
                            onClick={() => {
                                handleTabView('followers')
                            }}
                            className="flex cursor-pointer gap-3"
                        >
                            <p>Followers</p> <p>{followerNumbers}</p>
                        </button>
                        <button
                            onClick={() => {
                                handleTabView('following')
                            }}
                            className="flex cursor-pointer gap-3"
                        >
                            <p>Following</p> <p>{followingNumber}</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8 empty:hidden">
                {show[0] && postCards}
                {show[1] && followerCards}
                {show[2] && followingCards}
            </div>
        </div>
    )
}

export default UserProfile
