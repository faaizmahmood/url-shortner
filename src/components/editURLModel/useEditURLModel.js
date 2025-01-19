import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../store/slices/userSlice";
import * as Yup from 'yup'

const useEditURLModel = (initialData) => {

    const token = Cookies.get('authToken');
    const dispatch = useDispatch();

    const initialValues = {
        shortURL: initialData?.shortURL || "N/A",
        longURL: initialData?.longURL || "N/A",
        description: initialData.description ? initialData.description : ""
    };

    const validationSchema = Yup.object({
        shortURL: Yup.string()
            .required("Short URL is required")
            .matches(/^\S*$/, "Short URL cannot contain spaces"), // This regex disallows spaces
        longURL: Yup.string().required("Long URL is required"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {


            if (
                values.shortURL === initialValues.shortURL &&
                values.longURL === initialValues.longURL &&
                values.description === initialValues.description
            ) {
                // No changes made, alert user
                toast.info("No changes were made to the URL.");
                return;
            }

            const payload = {
                id: initialData?._id,
                shortURL: values?.shortURL,
                longURL: values?.longURL,
                description: values.description
            };

            try {
                const response = await axios.put(
                    'http://localhost:5000/api/url/url-update',
                    payload,
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : ''
                        }
                    }
                );

                if (response.status === 201) {
                    toast.error('This short URL already in use!');
                }

                if (response.status === 200) {
                    // Call your function when the response status is 200
                    toast.success('URL Updated successfully!');
                    dispatch(fetchUserProfile()); // Call the function here
                }

                console.log(response?.data);

            } catch (error) {
                console.log(error);
                toast.error("Error while updating URL.");
            }

            console.log(payload);
        }
    });

    return {
        formik
    };
}

export default useEditURLModel;
