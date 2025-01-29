/* eslint-disable no-unused-vars */
import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from 'yup'

const useSignup = () => {

    const navigate = useNavigate()

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {

            const signupPromise = axios.post('https://url-shortner-server-f091f5331ce0.herokuapp.com/api/auth/signup', values)

            // Show success toast if signup succeeds
            toast.promise(signupPromise, {
                pending: 'Signing up... Please wait ⏳',
                success: 'Signup successful! 🎉',
                error: {
                    render({ data }) {
                        const status = data?.response?.status;
                        if (status === 400) {
                            return 'Email already in use';
                        }

                        return 'An unexpected error occurred. Please try again.';
                    }
                }
            })

            try {

                await signupPromise


                formik.resetForm()

                navigate('/auth/signin')

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

export default useSignup
