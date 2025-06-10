import App from "./components/App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LoginPage from "./components/LoginPage/LoginPage";

const routes = [
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/login", element: <LoginPage /> },
  
];

export default routes;
