import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { fetchUserProfile } from "./store/slices/userSlice"
// import AppRoutes from "./routes/routes"
import Layout from './layout/layout'


const App = () => {

    const dispatch = useDispatch()


    useEffect(() => {

        if (Cookies.get('authToken')) {
            dispatch(fetchUserProfile())
        }

    }, [dispatch])

    return (
        <>

            <Layout />

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App