function MessageBubble({ message, senderId }) {
    console.log(typeof +localStorage.getItem('userId'))
    console.log(typeof senderId)
    let bubbleStyles = 'outgoingBubble'
    if (senderId !== +localStorage.getItem('userId')) {
        bubbleStyles = 'incomingBubble'
    }

    const messageStyleVariants = {
        incomingBubble:
            'self-start rounded-t-2xl rounded-r-2xl bg-slate-300 px-4 py-2 text-black',
        outgoingBubble:
            'self-end rounded-t-2xl rounded-l-2xl bg-blue-500 px-4 py-2',
    }

    return (
        <span className={`${messageStyleVariants[bubbleStyles]}`}>
            <p>{message}</p>
        </span>
    )
}

export default MessageBubble
