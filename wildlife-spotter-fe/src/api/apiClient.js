import axios from "axios";
import { API_BASE_URL } from "./urlsconfig";
import { refreshAccessToken } from "./authService";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // Only attach the Authorization header if requiresAuth is true
    const token = localStorage.getItem("access_token");
    if (
      token &&
      (config.requiresAuth === undefined || config.requiresAuth === true)
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshAccessToken();
        const newToken = localStorage.getItem("access_token");

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Error refreshing access token:", err);
        // Handle error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
