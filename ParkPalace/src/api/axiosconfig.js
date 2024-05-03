import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('jwt') || null

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers : {Authorization: `Bearer ${token}`}
})
export default axiosInstance;