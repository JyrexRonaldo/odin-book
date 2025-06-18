import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

function CreatePostPage() {
    const navigate = useNavigate()

    function handleCancelButton() {
        navigate('/')
    }

    return (
        <>
            <div className="grid min-h-screen grid-rows-[auto_1fr] bg-blue-950">
                <Navbar />
                <div className="flex items-center justify-center">
                    <form className="mx-5 flex min-h-96 w-full max-w-2xl flex-col gap-5 rounded-lg bg-blue-900 p-5 text-white">
                        <p className="text-5xl font-bold">Create Post</p>
                        <div>
                            <p>Image</p>
                            <div className="flex min-h-56 justify-center rounded-lg bg-blue-500 p-5 text-center">
                                <div className="flex min-h-full flex-col justify-between">
                                    <p>Drag Here to Upload Media</p>
                                    <p>
                                        Should be less than 9mb and only ong and
                                        jpg files
                                    </p>
                                    <p>Recommended size:</p>
                                    <p>2000px by 2000 px</p>
                                    <div></div>
                                    <button>Browse Files</button>
                                </div>
                                <input
                                    type="file"
                                    name="postImage"
                                    id="postImage"
                                    className="h-0 w-0 p-0 opacity-0"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="postText">Post</label>
                            <textarea
                                className="min-h-28 max-w-2xl resize-y rounded-lg bg-white p-5"
                                name="postText"
                                placeholder="Write down your thoughts..."
                                id="postText"
                            ></textarea>
                        </div>
                        <div className="flex gap-3">
                            <button className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600">
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
            </div>
        </>
    )
}

export default CreatePostPage
