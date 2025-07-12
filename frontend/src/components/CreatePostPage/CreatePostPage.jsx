import { FaCloudUploadAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CreatePostPage() {
    const [postBody, setPostBody] = useState('')
    // const [file, setFile] = useState(null)
    const [selectedImgUrl, setSelectedImgUrl] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/login')
        }
    })

    function handlePostTextarea(e) {
        setPostBody(e.target.value)
    }

    function handleCancelButton() {
        navigate('/explore')
    }

    async function handleCreatePostButton() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/posts`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        body: postBody,
                        authorId: localStorage.getItem('userId'),
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setPostBody('')
                navigate('/explore')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleImageSelector(e) {
        console.log(e.target.files[0])
        const file = e.target.files[0]
        if (file) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            // fileReader.onload = console.log(this)
            fileReader.addEventListener('load', function () {
                console.log(this.result)
                setSelectedImgUrl(this.result)
            })
        }
    }

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-start gap-10 p-5">
                <Navbar />
                <form className="flex w-full max-w-2xl flex-col gap-5 rounded-lg bg-blue-900 p-5 text-white">
                    <p className="text-5xl font-bold">Create Post</p>
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-bold">Image</p>
                        <div className="relative flex min-h-56 justify-center rounded-lg bg-blue-500 p-5 text-center">
                            <div className="flex flex-col items-center justify-between">
                                <p>Drag Here to Upload Media</p>
                                <p>
                                    Should be less than 9mb and only png and jpg
                                    files
                                </p>
                                <p>Recommended size:</p>
                                <p>2000px by 2000 px</p>
                                <FaCloudUploadAlt className="size-8" />
                                <label htmlFor="postImage">Browse Files</label>
                            </div>
                            <input
                                onChange={handleImageSelector}
                                // files={}
                                type="file"
                                name="postImage"
                                id="postImage"
                                accept="image/*"
                                className="absolute top-0 h-full w-full bg-red-600/0 text-fuchsia-700"
                            />
                        </div>
                    </div>
                    {/* <div> */}
                    { selectedImgUrl &&  <img
                        className="h-auto w-full rounded-lg"
                        src={selectedImgUrl}
                        alt=""
                    />}
                    {/* </div> */}
                    <div className="flex flex-col gap-3">
                        <label
                            className="text-2xl font-bold"
                            htmlFor="postText"
                        >
                            Post
                        </label>
                        <textarea
                            onChange={handlePostTextarea}
                            value={postBody}
                            className="resize-y rounded-lg bg-white p-5 text-black"
                            name="postText"
                            placeholder="Write down your thoughts..."
                            id="postText"
                            rows={5}
                        ></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleCreatePostButton}
                            className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600"
                        >
                            Create Post
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelButton}
                            className="cursor-pointer rounded-lg px-3 py-1 text-xl text-blue-500 hover:underline hover:underline-offset-4"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePostPage
