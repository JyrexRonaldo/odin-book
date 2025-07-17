function MessageView() {
    return (
        <div className="h-screen bg-red-600 text-white lg:grid lg:grid-cols-[1fr_2fr]">
            <div className="bg-green-600 max-lg:hidden">MessageView </div>
            <div className="bg-yellow-600"> Hello</div>
        </div>
    )
}

export default MessageView
