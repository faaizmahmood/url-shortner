import { RouterProvider } from "react-router-dom"
import router from "./routes/routes"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import Cookies from "js-cookie"
import { fetchUserProfile } from "./store/slices/userSlice"


const App = () => {

    const dispatch = useDispatch()


    useEffect(() => {

        if (Cookies.get('authToken')) {
            dispatch(fetchUserProfile())
        }

    }, [dispatch])

    return (
        <>
            <RouterProvider router={router} />

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