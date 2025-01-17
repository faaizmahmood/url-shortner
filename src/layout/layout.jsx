/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom"
import Cookies from "js-cookie";
import Header from "../pages/protected/header/header";
import Footer from "../pages/protected/footer/footer";

const Layout = () => {

    const authToken = Cookies.get('authToken')

    const isLoggedIn = authToken ? true : false

    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(navigation.state === "loading");
    }, [navigation.state]);

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }


    return (
        <>
            {/* Header */}
            {isLoggedIn ? <Header /> : ""}

            {/* Routes */}

            <Outlet />

            {/* Routes */}

            {/* Footer */}
            {isLoggedIn ? <Footer /> : ""}
        </>
    )
}

export default Layout