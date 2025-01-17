import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUserProfile } from '../../../store/slices/userSlice';



const useDashboard = () => {


    const [URL, setURL] = useState("");

    const [loading, setLoading] = useState(false); // To manage loading state

    const [shortenedURL, setShortenedURL] = useState(null);

    const [open, setOpen] = useState(false);

    const [selectedURLData, setSelectedURLData] = useState(null)

    const handleOpen = (urlData) => {
        setOpen(true)
        setSelectedURLData(urlData)
    };

    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (Cookies.get('authToken')) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    const handelLogout = () => {

        Object.keys(Cookies.get()).forEach(cookie => Cookies.remove(cookie))

        window.location.reload()

    }


    const getdate = (date) => {

        const newDate = new Date(date)

        const formateDate = newDate.toLocaleDateString('en-US')

        return formateDate

    }

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M+';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k+';
        } else {
            return num.toString();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get("authToken");

        if (!URL) {
            toast.error("URL is required.");
            return;
        }

        setLoading(true);

        try {

            const response = await toast.promise(
                axios.post(
                    "http://localhost:5000/api/url/url-shorten",
                    { URL: URL },
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                        },
                    }
                ),
                {
                    pending: 'Shortening the URL...', // Pending toast message
                    success: 'URL successfully shortened!', // Success toast message
                }
            )

            // const response = await axios.post(
            //     "http://localhost:5000/api/url/url-shorten",
            //     { URL: URL },
            //     {
            //         headers: {
            //             Authorization: token ? `Bearer ${token}` : '',
            //         },
            //     }
            // );

            // Log the full response for debugging
            console.log(response.data);

            // Check if the response contains the shortened URL
            if (response.data && response.data.shortURL) {
                setShortenedURL(response.data.shortURL);
                toast.success("URL successfully shortened!");
                dispatch(fetchUserProfile());
            } else {
                toast.error(response.data.message || "Failed to shorten the URL.");
            }
        } catch (err) {
            console.log(err)

            if (err.response && err.response.status === 409) {
                toast.warning("URL already been shortened.");
            } else {
                toast.error("Error while shortening URL.");
            }

        } finally {
            setLoading(false);
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText("http://localhost:5173/u/" + text);
        toast.success("Copied the text")
    }

    return {
        handelLogout,
        handleSubmit,
        setURL,
        loading,
        shortenedURL,
        copyText,
        handleOpen,
        handleClose,
        open,
        selectedURLData,
        getdate,
        formatNumber
    }
}

export default useDashboard