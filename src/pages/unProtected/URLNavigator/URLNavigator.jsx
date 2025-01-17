import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const URLNavigator = () => {
    const { shortURL } = useParams();

    useEffect(() => {
        const fetchLongURL = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/url/url-redirect/${shortURL}`);

                // Check if longURL exists in the response
                if (response.data && response.data.longURL) {
                    // Redirect to the long URL
                    window.location.replace(response.data.longURL);  // This ensures the client side follows the redirection
                } else {
                    toast.error("URL not found or invalid.");
                }
            } catch (error) {
                console.error("Error while redirecting:", error);
                toast.error("Error while redirecting!");
            }
        };

        fetchLongURL();
    }, [shortURL]);

    return <div>Navigating to your URL...</div>;
};

export default URLNavigator;
