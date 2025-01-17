import { toast } from "react-toastify";
import Cookies from "js-cookie"
import axios from "axios"

const handleGoogleLoginSuccess = async (credentialResponse) => {

    console.log(credentialResponse.credential)

    try {
        // Send OAuth token to backend for verification and user creation
        const response = await axios.post('http://localhost:5000/api/auth/oauth/google', {
            credential: credentialResponse.credential,
        });

        // Handle backend response (e.g., user details and token)
        const { user } = response.data;

        // Store the token in cookies or localStorage
        Cookies.set("authToken", user, { expires: 7 });

        
        toast.success("Google sign-in successful! 🎉");

        // Navigate to the homepage or dashboard after successful login
         window.location.reload()

    } catch (error) {
        console.log(error)
        toast.error("Google sign-in failed. Please try again.");
    }
};


export default handleGoogleLoginSuccess