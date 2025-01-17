/* eslint-disable no-unused-vars */
import axios from "axios"
import { useFormik } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from 'yup'
import Cookies from "js-cookie"

const useSignin = () => {

    const navigate = useNavigate()

    // const location = useLocation()

    // if(location.pathname)


    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Invalid email format"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {

            const signupPromise = axios.post('http://localhost:5000/api/auth/signin', values)

            // Show success toast if signup succeeds
            toast.promise(signupPromise, {
                pending: 'Signing in... Please wait ⏳',
                success: 'Signin successful! 🎉',
                error: {
                    render({ data }) {
                        const status = data?.response?.status;
                        if (status === 404) {
                            return 'User not found.';
                        }
                        if (status === 401) {
                            return 'Password is incorrect.';
                        }

                        return 'An unexpected error occurred. Please try again.';
                    }
                }
            })

            try {

                const response = await signupPromise

                const { user } = response.data;

                Cookies.set('authToken', user, { expires: 7 })


                formik.resetForm()

                navigate('/')

            } catch (error) {
                // Display error toast based on the error type
                if (error.response?.status === 400) {
                    toast.error("Email already in use")
                } else {
                    toast.error("An unexpected error occurred. Please try again.")
                }
            }
        },
    })

    return {
        formik,
    }
}

export default useSignin
