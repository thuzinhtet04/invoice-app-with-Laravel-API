import axios from "axios";
import { getCookie } from "react-use-cookie";

const api = axios.create({
    headers : {
        "Content-Type" : "application/json"
    }
})
export default api





