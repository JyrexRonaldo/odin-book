import { ImHeart } from 'react-icons/im'
import { FaComment } from 'react-icons/fa'
import { TbArrowForwardUp } from "react-icons/tb";

function PostComponent() {
    return (
        <>
            <div className="flex flex-col gap-2 rounded-xl bg-blue-900 py-5 text-white">
                <div className="flex items-center gap-2.5 px-2.5">
                    <img
                        src="/morty.jpg"
                        className="size-16 rounded-full"
                        alt=""
                    />
                    <div>
                        <p className="font-bold">name</p>
                        <p>@username</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <img src="/mass-effect.jpeg" alt="" />
                    <p className="px-2.5">Great game</p>
                </div>
                <div className="flex gap-2 px-2.5">
                    <button className="flex cursor-pointer items-center gap-1">
                        <ImHeart className="size-6" />
                        <p>0</p>
                    </button>
                    <button className="flex cursor-pointer items-center gap-1">
                        <FaComment className='size-6' />
                        <p>0</p>
                    </button>
                    <button className="ml-auto flex cursor-pointer items-center gap-1">
                        <TbArrowForwardUp className='size-7'/>
                    </button>
                </div>
                <div>
                    <p className="px-2.5 text-xs">Jun 17, 2025, 2:43 PM</p>
                </div>
                <div className="flex gap-4 px-2.5 text-sm">
                    <a href="">View Comments...</a>
                    <a className="text-red-600" href="">
                        Delete Post
                    </a>
                </div>
            </div>
        </>
    )
}

export default PostComponent
