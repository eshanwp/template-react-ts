import axios from 'axios';
import {manuallyDecrementPromiseCounter, manuallyIncrementPromiseCounter} from 'react-promise-tracker';
import {store} from "shared/redux/store";

export const abortController = new AbortController();
// When you want to cancel the API, you can use the abortController.abort()

const apiInstance = axios.create({
    baseURL: '/api',
});


/**
 * @author Eshan Priyadarshana <eshan@regovtech.com>
 * @description Request interceptor for API calls
 */
apiInstance.interceptors.request.use(
    async (config) => {
        const {accessToken} = store.getState().authModel;

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            manuallyIncrementPromiseCounter();
        }

        if (config) {
            config.signal = abortController.signal
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

/**
 * @author Eshan Priyadarshana <eshan@regovtech.com>
 * @description Response interceptor for API calls
 */
apiInstance.interceptors.response.use(
    (response) => {
        manuallyDecrementPromiseCounter();
        return response;
    },
    async function (error) {
        manuallyDecrementPromiseCounter();

        // Handle errors globally
        console.error('Axios Response Error:', error);

        // Optionally, we can perform specific actions based on the error status
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Status:', error.response.status);
            console.error('Response Data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received. Request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request Error:', error.message);
        }

        // We can choose to rethrow the error or handle it as needed
        return Promise.reject(error);
    },
);
export default apiInstance;
