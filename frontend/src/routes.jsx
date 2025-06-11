import App from './components/App/App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginPage from './components/LoginPage/LoginPage'
import Signup from './components/SignupPage/Signup'

const routes = [
    { path: '/', element: <App />, errorElement: <ErrorPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <Signup /> },
]

export default routes
