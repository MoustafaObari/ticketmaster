import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Replace with your API base URL
    withCredentials: true,
    // Other custom settings
    headers: {
        'Content-Type': 'application/json',
        // Add other headers if needed
    },
});

export default axiosInstance;