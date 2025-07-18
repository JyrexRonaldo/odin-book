function MessageBubble({ message }) {

    const messageStyleVariants = {
        incomingBubble: 'bg-slate-300 text-black rounded-t-2xl self-start  rounded-r-2xl   px-4 py-2',
        outgoingBubble: 'bg-blue-500 rounded-t-2xl  rounded-l-2xl   px-4 py-2',
    }

    return (
        <span  className={`${messageStyleVariants['incomingBubble']}`} >
            <p >{message}</p>
        </span>
    )
}

export default MessageBubble
