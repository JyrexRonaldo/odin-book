import App from './components/App/App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginPage from './components/LoginPage/LoginPage'
import Signup from './components/SignupPage/Signup'
import CreatePostPage from './components/CreatePostPage/CreatePostPage'
import AccountEdit from './components/AccountEdit/AccountEdit'
import UserProfile from './components/UserProfile/UserProfile'
import UserList from './components/UserList/UserList'
import Feed from './components/Feed/Feed'
import Explore from './components/Explore/Explore'
import Likes from './components/Likes/Likes'
import PostItem from './components/PostItem/PostItem'
import MessageView from './components/MessageView/MessageView'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Explore /> },
            { path: '/account', element: <AccountEdit /> },
            { path: '/feed', element: <Feed /> },
            { path: '/explore', element: <Explore /> },
            { path: '/users', element: <UserList /> },
            { path: '/likes', element: <Likes /> },
            { path: '/users/:username', element: <UserProfile /> },
            { path: '/posts/:postId', element: <PostItem /> },
        ],
        errorElement: <ErrorPage />,
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <Signup /> },
    { path: '/post/create', element: <CreatePostPage /> },
    { path: '/messenger', element: <MessageView /> },
]

export default routes
