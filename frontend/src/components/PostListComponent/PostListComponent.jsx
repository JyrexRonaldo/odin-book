import PostComponent from '../PostComponent/PostComponent'
import { useState } from 'react'

function PostListComponent({ data }) {
    const [buttonStyles, setButtonStyles] = useState([
        'default',
        'selected',
        'default',
    ])

    const buttonColorVariants = {
        default:
            'cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500',
        selected:
            'cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-white',
    }

    function handleSelect(e) {
        if (e.target.textContent === 'Popular') {
            setButtonStyles(['selected', 'default', 'default'])
        } else if (e.target.textContent === 'Latest') {
            setButtonStyles(['default', 'selected', 'default'])
        } else {
            setButtonStyles(['default', 'default', 'selected'])
        }
    }

    console.log(data)

    const dataCards = data.map((dataItem) => {
        return (
            <PostComponent
                key={dataItem.id}
                name={dataItem.author.name}
                username={dataItem.author.username}
                body={dataItem.body}
                createdAt={dataItem.createdAt}
                commentCount={dataItem._count.comments}
            />
        )
    })

    return (
        <div className="flex w-full max-w-xl flex-col gap-5 rounded-lg lg:min-w-md">
            <nav className="flex gap-2.5">
                <button
                    onClick={handleSelect}
                    className={`${buttonColorVariants[buttonStyles[0]]}`}
                >
                    Popular
                </button>
                <button
                    onClick={handleSelect}
                    className={`${buttonColorVariants[buttonStyles[1]]}`}
                >
                    Latest
                </button>
                <button
                    onClick={handleSelect}
                    className={`${buttonColorVariants[buttonStyles[2]]}`}
                >
                    Oldest
                </button>
            </nav>
            <div className="flex flex-col gap-8">
                {/* <PostComponent />
                <PostComponent />
                <PostComponent />
                <PostComponent />
                <PostComponent />
                <PostComponent />
                <PostComponent />
                <PostComponent /> */}

                {dataCards}
            </div>
        </div>
    )
}

export default PostListComponent
