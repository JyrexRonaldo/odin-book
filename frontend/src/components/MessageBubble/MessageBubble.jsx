import { RiDeleteBinLine } from 'react-icons/ri'
import MessageBubbleTriggerContext from '../MessageBubbleTriggerContext/MessageBubbleTriggerContext'
import { useContext } from 'react'

function MessageBubble({ id, message, senderId }) {
    const { setMessageBubbleTriggerRender } = useContext(
        MessageBubbleTriggerContext
    )
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
            setMessageBubbleTriggerRender(self.crypto.randomUUID())
        } catch (error) {
            console.log(error)
        }
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
                <button
                    onClick={messageDeleteHandler}
                    type="button"
                    className="hidden group-hover:inline"
                >
                    <RiDeleteBinLine className="text-red-600" />
                </button>
            )}
        </span>
    )
}

export default MessageBubble
