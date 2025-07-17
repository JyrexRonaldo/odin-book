import { VscSend } from 'react-icons/vsc'
import { MdOutlineInsertEmoticon } from 'react-icons/md'

function TextInput() {
    return (
        <div className="mx-auto mb-5 grid max-w-11/12 grid-cols-[min-content_auto_min-content] items-center gap-4 rounded-lg bg-blue-900 p-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-900">
            <button type="button" className="cursor-pointer">
                <MdOutlineInsertEmoticon className='size-7' />
            </button>
            <input
                type="text"
                placeholder="Type message here 😉"
                className="mr-3 w-full bg-blue-900 focus:outline-none"
            />
            <button type="button" className="cursor-pointer">
                <VscSend className='size-7'  />
            </button>
        </div>
    )
}

export default TextInput
