/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useHome = () => {
    const [URL, setURL] = useState("");
    const [loading, setLoading] = useState(false); // To manage loading state
    const [shortenedURL, setShortenedURL] = useState(null); // To store the shortened URL

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = Cookies.get("authToken");

        if (!URL) {
            toast.error("URL is required.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "https://url-shortner-server-f091f5331ce0.herokuapp.com/api/url/url-shorten",
                { URL: URL },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );

            // Log the full response for debugging
            console.log(response.data);

            // Check if the response contains the shortened URL
            if (response.data && response.data.shortURL) {
                setShortenedURL(response.data.shortURL);
                toast.success("URL successfully shortened!");
            } else {
                toast.error(response.data.message || "Failed to shorten the URL.");
            }
        } catch (err) {
            toast.error("Error while shortening URL.");
        } finally {
            setLoading(false);
        }
    };


    const copyText = (text) => {
        navigator.clipboard.writeText("http://localhost:5173/u/" + text);
        toast.success("Copied the text")
    }


    return {
        setURL,
        handleSubmit,
        loading,
        shortenedURL,
        copyText
    };
};

export default useHome;
