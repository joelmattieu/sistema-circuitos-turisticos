import axios from "axios";
import { getBackendURL } from "../utils/api-config";

const API_BASE_URL = getBackendURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
