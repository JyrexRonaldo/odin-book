import App from './components/App/App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginPage from './components/LoginPage/LoginPage'
import Signup from './components/SignupPage/Signup'
import CreatePostPage from './components/CreatePostPage/CreatePostPage'
import PostListComponent from './components/PostListComponent/PostListComponent'
import AccountEdit from './components/AccountEdit/AccountEdit'
import UserProfile from './components/UserProfile/UserProfile'
import UserList from './components/UserList/UserList'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [{ index: true, element: <UserList /> }],
        errorElement: <ErrorPage />,
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <Signup /> },
    { path: '/post/create', element: <CreatePostPage /> },
]

export default routes
