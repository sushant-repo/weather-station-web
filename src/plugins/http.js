import axios from "axios";

export default function http(){
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        timeout: process.env.NODE_ENV === "development" ? 0 : 5000,
        headers: {
            "Content-Type": "application/json"
        }
    })
}