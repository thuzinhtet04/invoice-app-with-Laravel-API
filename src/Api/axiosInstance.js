import axios from "axios";
import { getCookie } from "react-use-cookie";

const token = getCookie("my-token");
console.log(token)
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      
        Authorization: `Bearer ${token}` 
      
    },
  });


export default api





