import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import Cookies from 'js-cookie';
import URLNavigator from '../pages/unProtected/URLNavigator/URLNavigator';
import React, { Suspense } from 'react';

// Lazily loading components
const Dashboard = React.lazy(() => import('../pages/protected/dashboard/dashboard'));
const Home = React.lazy(() => import('../pages/unProtected/home/home'));
const Signup = React.lazy(() => import('../auth/signup/signup'));
const Signin = React.lazy(() => import('../auth/signin/signin'));

import Loading from '../components/Loading/Loading';
import { useSelector } from 'react-redux';
import Error from '../components/Error/Error';

const authToken = Cookies.get('authToken');

const isLoggedIn = authToken ? true : false;

function AppRoutes() {

    const { profile } = useSelector((state) => state.user)


    if (isLoggedIn && profile === null) {
        return (
            <>
                <Error
                    call={"serverError"}
                    title={"We're sorry - something has gone wrong on our end"}
                    description={"We're currently experiencing technical difficulties. Please reload this page to resolve. If the problem persists, please contact Support."}
                />
            </>
        )
    }

    return (


        <>
            <Suspense fallback={<Loading />}>

                <Routes>
                    {/* Public Routes */}
                    <Route path="/auth/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Signup />} />
                    <Route path="/auth/signin" element={isLoggedIn ? <Navigate to="/" replace /> : <Signin />} />
                    <Route path="/u/:shortURL" element={<URLNavigator />} />


                    {/* Conditionl Route */}
                    <Route
                        path="/"
                        element={isLoggedIn ? <Dashboard /> : <Home />}
                    />

                    <Route
                        path="/about"
                        element={
                            <ProtectedRoutes allowedRoles={['user', 'admin']}>
                                <h1>About Page</h1>
                            </ProtectedRoutes>
                        }
                    />

                    {/* Catch-All Route for 404 */}
                    <Route
                        path="*"
                        element={
                            <Error
                                call={"routeError"}
                                title={"Oops! Page Not Found"}
                                description={
                                    "The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage."
                                }
                            />
                        }
                    />
                </Routes>

            </Suspense>
        </>
    );
}

export default AppRoutes;
