import axios from "axios";

// Membuat instance axios untuk request ke API GitHub
export const apiRequest = axios.create({
    baseURL: "https://api.github.com/", // Base URL API GitHub
});
