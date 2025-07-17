function MessageBubble({ message }) {
    return (
        <span className="bg-blue-500 rounded-t-2xl  rounded-l-2xl   px-4 py-2">
            <p >{message}</p>
        </span>
    )
}

export default MessageBubble
