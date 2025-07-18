import MessageBubble from '../MessageBubble/MessageBubble'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { BiSolidUserCircle } from 'react-icons/bi'
import TextInput from '../TextInput/TextInput'


function ChatBox({avatarUrl}) {
    return (
        <div className="flex h-full flex-col justify-between bg-blue-950/60">
            <div className="grid grid-cols-[auto_1fr] bg-blue-900">
                <button className="flex min-w-23 items-center justify-center lg:hidden">
                    <MdOutlineKeyboardBackspace className="size-8" />
                </button>
                <div className="flex h-24 max-w-full items-center gap-3 px-6">
                    {avatarUrl === 'null' ? (
                        <BiSolidUserCircle className="size-18" />
                    ) : (
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="size-14 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <p className="font-extrabold">Name</p>
                        <p className="font-extralight">@Username</p>
                        <p className="text-xs">Date Joined</p>
                    </div>
                </div>
            </div>
            <div className="scrollbar-hide flex h-full flex-col items-end gap-2 overflow-y-auto px-4">
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
                <MessageBubble message={'Hello test message'} />
            </div>
            <div>
                <TextInput />
            </div>
        </div>
    )
}

export default ChatBox
