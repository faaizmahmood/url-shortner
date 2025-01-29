/* eslint-disable no-unused-vars */
import { matchPath, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../pages/protected/header/header";
import Footer from "../pages/protected/footer/footer";
import AppRoutes from "../routes/routes";

const Layout = () => {
    const location = useLocation(); // Get the current route
    const authToken = Cookies.get("authToken");
    const isLoggedIn = authToken ? true : false;

    // Define routes where the header and footer should not be shown
    const routesWithoutHeaderFooter = ["/u/:shortURL", "/auth/signin", "/auth/signup"];

    // Check if the current path matches any of the excluded routes
    const shouldShowHeaderFooter = !routesWithoutHeaderFooter.some((route) =>
        matchPath(route, location.pathname)
    );

    return (
        <>
            {/* Header */}
            {shouldShowHeaderFooter && isLoggedIn && <Header />}

            {/* Routes */}
            <AppRoutes />

            {/* Footer */}
            {shouldShowHeaderFooter && isLoggedIn && <Footer />}
        </>
    );
};

export default Layout;
