import { FaCloudUploadAlt } from 'react-icons/fa'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

function CreatePostPage() {
    const navigate = useNavigate()

    function handleCancelButton() {
        navigate('/')
    }

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-start gap-10 p-5">
                <Navbar />
                <form className="flex w-full max-w-2xl flex-col gap-5 rounded-lg bg-blue-900 p-5 text-white">
                    <p className="text-5xl font-bold">Create Post</p>
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl font-bold">Image</p>
                        <div className="flex min-h-56 justify-center rounded-lg bg-blue-500 p-5 text-center">
                            <div className="flex flex-col justify-between items-center">
                                <p>Drag Here to Upload Media</p>
                                <p>
                                    Should be less than 9mb and only ong and jpg
                                    files
                                </p>
                                <p>Recommended size:</p>
                                <p>2000px by 2000 px</p>
                                <FaCloudUploadAlt className='size-8' />
                                <label htmlFor="postImage">Browse Files</label>
                            </div>
                            <input
                                type="file"
                                name="postImage"
                                id="postImage"
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <label
                            className="text-2xl font-bold"
                            htmlFor="postText"
                        >
                            Post
                        </label>
                        <textarea
                            className="resize-y rounded-lg bg-white p-5 text-black"
                            name="postText"
                            placeholder="Write down your thoughts..."
                            id="postText"
                            rows={5}
                        ></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button className="cursor-pointer rounded-lg bg-blue-500 px-3 py-1 text-xl text-blue-950 hover:bg-blue-600">
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
