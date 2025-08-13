import { RiDeleteBinLine } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { useContext } from 'react'
import TextInputContext from '../TextInputContext/TextInputContext'
import socket from '../../../socket-io/sockets'

function MessageBubble({ id, message, senderId }) {
    const { setIsEdit, setMessageBody, setMessageId, inputRef } = useContext(TextInputContext)
    let bubbleStyles = 'outgoingBubble'
    if (senderId !== +localStorage.getItem('userId')) {
        bubbleStyles = 'incomingBubble'
    }

    async function messageDeleteHandler() {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/messages`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${localStorage.getItem('userToken')}`,
                    },
                    body: JSON.stringify({
                        messageId: id,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            socket.emit('message') 
        } catch (error) {
            console.log(error)
        }
    }

    function messageEdithandler() {
        setMessageBody(message)
        setIsEdit(true)
        setMessageId(id)
        inputRef.current.focus()
    }

    const messageStyleVariants = {
        incomingBubble:
            'self-start rounded-t-2xl rounded-r-2xl bg-slate-300 px-4 py-2 text-black',
        outgoingBubble:
            'group flex items-center gap-1 self-end rounded-t-2xl rounded-l-2xl bg-blue-500 px-4 py-2',
    }

    return (
        <span className={`${messageStyleVariants[bubbleStyles]}`}>
            <p>{message}</p>
            {senderId === +localStorage.getItem('userId') && (
                <div className="hidden items-center gap-1 max-lg:flex group-hover:flex">
                    <button onClick={messageEdithandler} type="button">
                        <FaRegEdit className="text-slate-200" />
                    </button>
                    <button onClick={messageDeleteHandler} type="button">
                        <RiDeleteBinLine className="text-red-600" />
                    </button>
                </div>
            )}
        </span>
    )
}

export default MessageBubble
