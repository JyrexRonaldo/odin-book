import { Link } from 'react-router-dom'

function Textarea({
    textFieldValue,
    textFieldHandler,
    sendButtonHandler,
    placeholderText,
}) {
    return (
        <div className="sticky bottom-0 mt-auto flex items-center justify-between gap-2 bg-blue-800 p-2.5">
            <img src="/morty.jpg" className="size-12 rounded-full" alt="" />

            <textarea
                className="grow resize-none rounded-[7px] bg-white px-2 py-1 text-black"
                name="comment"
                id=""
                placeholder={placeholderText}
                rows="2"
                value={textFieldValue}
                onChange={textFieldHandler}
            ></textarea>

            <button
                className="rounded-[7px] bg-blue-500 p-2 text-black"
                onClick={sendButtonHandler}
            >
                Send
            </button>
        </div>
    )
}

export default Textarea
