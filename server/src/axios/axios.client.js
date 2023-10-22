import axios from "axios"
const get = async (url) => { 
    // Make an HTTP GET request using Axios to the specified URL
    const response = await axios.get(url)
    return response.data
};
export default {get};