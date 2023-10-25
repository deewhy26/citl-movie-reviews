import axios from "axios"; //allows us to communicate with APIs easily in our React apps. 
const get =async(url) =>{
    const response = await axios.get(url);
    return response.data;
};

export default {get};

