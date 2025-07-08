import { Link } from 'react-router-dom'

function Textarea({
    textBoxValue,
    textFieldHandler,
    sendButtonHandler,
    placeholderText,
}) {
    return (
        <div className="flex items-center justify-between gap-2 p-2.5 mt-auto">
            <img src="/morty.jpg" className="size-12 rounded-full" alt="" />

            <textarea
                className="grow resize-none rounded-[7px] bg-white text-black px-2 py-1"
                name="comment"
                id=""
                placeholder={placeholderText}
                rows="2"
                value={textBoxValue}
                onChange={textFieldHandler}
            ></textarea>

            <button
                className="rounded-[7px] bg-blue-500 text-black p-2"
                onClick={sendButtonHandler}
            >
                Send
            </button>
        </div>
    )
}

export default Textarea
