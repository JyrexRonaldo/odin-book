import { Link } from 'react-router-dom'

function Textarea({
    textFieldValue,
    textFieldHandler,
    sendButtonHandler,
    placeholderText,
}) {
    const avatarUrl = localStorage.getItem('avatar')

    return (
        <div className="sticky bottom-0 mt-auto flex items-center justify-between gap-2 bg-blue-800 p-2.5">
            {avatarUrl === 'null' ? (
                <BiSolidUserCircle className="size-9" />
            ) : (
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="size-12 rounded-full"
                />
            )}

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
