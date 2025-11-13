import axios from "axios";
import qs from "qs";

// .env에서 VITE_API_BASE_URL 값을 읽어옵니다.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    },
    });
