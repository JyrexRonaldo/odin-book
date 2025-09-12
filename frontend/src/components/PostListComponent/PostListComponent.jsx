import PostComponent from '../PostComponent/PostComponent'
import { useState } from 'react'

function PostListComponent({
    data,
    setData,
    // setTriggerRender
}) {
    const [currentTab, setCurrentTab] = useState('Latest')
    const [buttonStyles, setButtonStyles] = useState([
        'default',
        'selected',
        'default',
    ])

    const buttonColorVariants = {
        default:
            'cursor-pointer rounded-lg border-2 border-blue-500 bg-black px-3 py-1 text-blue-500 hover:text-blue-400',
        selected:
            'cursor-pointer rounded-lg border-2 border-blue-500 bg-blue-500 px-3 py-1 text-white',
    }

    function handleSelect(e) {
        if (e.target.textContent === 'Popular') {
            setButtonStyles(['selected', 'default', 'default'])
            setCurrentTab('Popular')
        } else if (e.target.textContent === 'Latest') {
            setButtonStyles(['default', 'selected', 'default'])
            setCurrentTab('Latest')
        } else if (e.target.textContent === 'Oldest') {
            setButtonStyles(['default', 'default', 'selected'])
            setCurrentTab('Oldest')
        }
    }

    function getOldestPost() {
        const sortedData = data.toSorted((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1
            } else {
                return 1
            }
        })
        return sortedData
    }
    function getLatestPost() {
        const sortedData = data.toSorted((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else {
                return 1
            }
        })
        return sortedData
    }
    function getMostPopularPost() {
        const sortedData = data.toSorted((a, b) => {
            if (a.likedBy.length > b.likedBy.length) {
                return -1
            } else {
                return 1
            }
        })
        return sortedData
    }

    function getPostCards(data) {
        const dataCards = data.map((dataItem) => {
            let isLikedByUser = false
            const likeArray = []
            dataItem.likedBy.forEach((item) => {
                likeArray.push(item.userId)
            })
            if (likeArray.includes(+localStorage.getItem('userId'))) {
                isLikedByUser = true
            }

            return (
                <PostComponent
                    key={dataItem.id}
                    id={dataItem.id}
                    name={dataItem.author.name}
                    username={dataItem.author.username}
                    body={dataItem.body}
                    createdAt={dataItem.createdAt}
                    commentCount={dataItem._count.comments}
                    likeCount={dataItem._count.likedBy}
                    isLikedByUser={isLikedByUser}
                    // setTriggerRender={setTriggerRender}
                    postImgUrl={dataItem.postImageUrl}
                    authorImg={dataItem.author.avatarImageUrl}
                    data={data}
                    setData={setData}
                />
            )
        })

        return dataCards
    }

    let dataCards = null

    if (currentTab === 'Popular') {
        const postData = getMostPopularPost()
        dataCards = getPostCards(postData)
    } else if (currentTab === 'Latest') {
        const postData = getLatestPost()
        dataCards = getPostCards(postData)
    } else if (currentTab === 'Oldest') {
        const postData = getOldestPost()
        dataCards = getPostCards(postData)
    }

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
            <div className="flex flex-col gap-8">{dataCards}</div>
        </div>
    )
}

export default PostListComponent
