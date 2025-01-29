/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const URLNavigator = () => {
    const { shortURL } = useParams();

    const [location, setLocation] = useState('');

    // timestamp
    const timestamp = new Date().toISOString();

    // Get referring source
    const referringPage = document.referrer || "Direct Visit";

    // Get device type (desktop, mobile, tablet)
    const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

    // Get operating system
    const os = navigator.platform;

    // Get browser information
    const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari|opera|edge)/i)[0];

    // Get geolocation (this is now handled correctly in the state)
    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
            }, (error) => {
                console.error("Error getting geolocation", error);
                setLocation('Location not available');
            });
        }

    }, []);

    useEffect(() => {

        const fetchLongURL = async () => {
            try {

                const payload = {
                    timestamp,
                    referringPage,
                    deviceType,
                    browser,
                    os,
                    location
                };

                const response = await axios.put(`https://url-shortner-server-f091f5331ce0.herokuapp.com/api/url/url-redirect/${shortURL}`, payload);

                // Check if longURL exists in the response
                if (response.data && response.data.longURL) {
                    // Redirect to the long URL
                    window.location.replace(response.data.longURL);
                } else {
                    toast.error("URL not found or invalid.");
                }
            } catch (error) {
                console.error("Error while redirecting:", error);
                toast.error("Error while redirecting!");
            }
        };

        if (shortURL) {
            fetchLongURL();
        }

    }, [shortURL]); // Re-run on any change in the tracking data

    return <div>Navigating to your URL...</div>;
};

export default URLNavigator;
