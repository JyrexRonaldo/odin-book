import { useEffect } from 'react'
import PostComponent from '../PostComponent/PostComponent'
import { BiSolidUserCircle } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa6'
import { useParams, useNavigate } from 'react-router-dom'

function UserProfile() {
    const navigate = useNavigate()
    const { username } = useParams()
    console.log(username)

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
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [navigate, username])

    return (
        <div className="flex w-full max-w-xl flex-col gap-10 text-white">
            <div className="flex flex-col gap-5 rounded-2xl bg-blue-900 p-5">
                <div className="flex flex-col items-center gap-3 text-center">
                    {/* <img src="" alt="" /> */}
                    <div>
                        <BiSolidUserCircle className="size-30" />
                    </div>
                    <div>
                        <p>ron</p>
                        <p>@ron</p>
                    </div>
                    <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 active:bg-blue-600">
                        Follow
                        <FaPlus />
                    </button>
                    <p>
                        Follow me and get to know me! We might end up best
                        friends!
                    </p>
                    <div className="flex gap-3">
                        <a className="flex gap-3" href="">
                            <p>Posts</p> <p>1</p>
                        </a>
                        <a className="flex gap-3" href="">
                            <p>Followers</p> <p>1</p>
                        </a>
                        <a className="flex gap-3" href="">
                            <p>Following</p> <p>1</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8 empty:hidden">
                <PostComponent />
                <PostComponent />
                <PostComponent />
            </div>
        </div>
    )
}

export default UserProfile
