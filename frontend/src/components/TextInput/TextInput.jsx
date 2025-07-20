import { VscSend } from 'react-icons/vsc'
import { ImCancelCircle } from 'react-icons/im'
import { MdOutlineInsertEmoticon } from 'react-icons/md'
import { useContext } from 'react'
import TextInputContext from '../TextInputContext/TextInputContext'

function TextInput() {
    const { createMessagHandler, textInputFieldHandler,setMessageBody, inputRef,messageBody, setIsEdit,isEdit } =
        useContext(TextInputContext)

        function cancelEditHandler() {
            setMessageBody('')
            setIsEdit(false)
        }

    return (
        <div className="mx-auto mb-5 grid max-w-11/12 grid-cols-[auto_min-content] items-center gap-4 rounded-lg bg-blue-900 p-4 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-900">
            <input
            ref={inputRef}
                type="text"
                placeholder="Type message here 😉"
                className="mr-3 w-full bg-blue-900 focus:outline-none"
                value={messageBody}
                onChange={textInputFieldHandler}
                onKeyUp={createMessagHandler}
            />
            <div className="flex gap-2">
                {isEdit && (
                    <button
                        onClick={cancelEditHandler}
                        type="button"
                        className="cursor-pointer"
                    >
                        
                        <ImCancelCircle className="size-7 text-red-600" />
                    </button>
                     )} 
                <button
                    onClick={createMessagHandler}
                    type="button"
                    className="cursor-pointer"
                >
                    <VscSend className="size-7" />
                </button>
            </div>
        </div>
    )
}

export default TextInput
