import { useState } from 'react'

function PostListComponent() {
    const [buttonStyles, setButtonStyles] = useState([
        'default',
        'default',
        'default',
    ])

    const buttonColorVariants = {
        default:
            'rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500',
        selected:
            'rounded-lg border-2 bg-blue-500 text-white border-blue-500 px-3 py-1',
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

    return (
        <div className="mx-5 w-full max-w-xl self-start inline-block rounded-lg h-80 bg-amber-800">
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
            <div></div>
        </div>
    )
}

export default PostListComponent
