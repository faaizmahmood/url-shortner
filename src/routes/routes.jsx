import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import Dashboard from '../pages/protected/dashboard/dashboard';
import Home from '../pages/unProtected/home/home';
import Layout from '../layout/layout';
import Signup from '../auth/signup/signup';
import Signin from '../auth/signin/signin';
import Cookies from 'js-cookie';
import URLNavigator from '../pages/unProtected/URLNavigator/URLNavigator';


const authToken = Cookies.get('authToken')


const isLoggedIn = authToken ? true : false;

// Define Routes with createBrowserRouter
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        loader: async () => {
            // Simulate a loader process
            new Promise((resolve) => setTimeout(resolve, 1000));
            return null;
        },
        children: [
            {
                index: true,
                element: isLoggedIn ? (
                    <ProtectedRoutes allowedRoles={["user"]}>
                        <Dashboard />
                    </ProtectedRoutes>
                ) : (
                    <Home />
                ),
            },
            {
                path: "about",
                element: <h1>About Page</h1>,
            },
        ],
    },
    {
        path: "/auth/signup",
        element: isLoggedIn ? <Navigate to="/" replace /> : <Signup />,
    },
    {
        path: "/auth/signin",
        element: isLoggedIn ? <Navigate to="/" replace /> : <Signin />,
    },
    {
        path: '/u/:shortURL',
        element: <URLNavigator/>
    },
    {
        path: "*",
        element: <h1>404 - Not Found</h1>,
    },
]);




export default router;
