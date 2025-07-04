import { useEffect, useState } from 'react'
import PostComponent from '../PostComponent/PostComponent'
import { BiSolidUserCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { FaMinus } from 'react-icons/fa6'
import { useParams, useNavigate } from 'react-router-dom'
import FollowCard from '../FollowCard/FollowCard'

function UserProfile() {
    const navigate = useNavigate()
    const { username } = useParams()
    const [profileData, setProfileData] = useState([])
    const [show, setShow] = useState([true, false, false])
    const [triggerRender, setTriggerRender] = useState(0)

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
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate, username, triggerRender])

    function handleTabView(tabName) {
        if (tabName === 'post') {
            setShow([true, false, false])
        } else if (tabName === 'followers') {
            setShow([false, true, false])
        } else {
            setShow([false, false, true])
        }
    }

    async function handleSendRequest() {
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
            setTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
    }

    const postCount = profileData._count?.posts
    const follwersCount = profileData._count?.followedBy
    const followingCount = profileData._count?.following

    const postsData = profileData?.posts

    const followerData = profileData?.followedBy?.map(
        (dataItem) => dataItem.following
    )

    const followingData = profileData?.following?.map(
        (dataItem) => dataItem.followedBy
    )

    const followerCards = followerData?.map((dataItem) => {
        let isFollowedValue = null
        dataItem.followedBy.forEach((element) => {
            if (element.followingId === +localStorage.getItem('userId')) {
                isFollowedValue = true
            } else {
                isFollowedValue = false
            }
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
                setTriggerRender={setTriggerRender}
                isFollowed={isFollowedValue}
            />
        )
    })

    const followingCards = followingData?.map((dataItem) => {
        // console.log(dataItem)
        let isFollowedValue = null
        dataItem.followedBy.forEach((element) => {
            if (element.followingId === +localStorage.getItem('userId')) {
                isFollowedValue = true
            } else {
                isFollowedValue = false
            }
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
                setTriggerRender={setTriggerRender}
                isFollowed={isFollowedValue}
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
            />
        )
    })

    let isFollowed = null
    profileData.followedBy?.forEach((element) => {
        if (element.following.id === +localStorage.getItem('userId')) {
            isFollowed = true
        } else {
            isFollowed = false
        }
    })

    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white">
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
                <div className="flex flex-col items-center gap-3 text-center">
                    <div>
                        <BiSolidUserCircle className="size-30" />
                    </div>
                    <div>
                        <p>{profileData.name}</p>
                        <p>@{profileData.username}</p>
                    </div>
                    {isFollowed ? (
                        <button
                            onClick={handleSendRequest}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500"
                        >
                            Unfollow
                            <FaMinus />
                        </button>
                    ) : (
                        <button
                            onClick={handleSendRequest}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-black"
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
                            <p>Followers</p> <p>{follwersCount}</p>
                        </button>
                        <button
                            onClick={() => {
                                handleTabView('following')
                            }}
                            className="flex cursor-pointer gap-3"
                        >
                            <p>Following</p> <p>{followingCount}</p>
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
