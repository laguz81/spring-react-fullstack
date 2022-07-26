//import axios from "axios";

// Add a response interceptor
import axios from "axios";

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export async function getAllStudents () {
        const response = await axios.get("api/v1/students");
        return await response.data;
}