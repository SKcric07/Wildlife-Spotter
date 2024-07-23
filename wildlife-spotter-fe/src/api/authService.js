import { jwtDecode } from "jwt-decode"; // Use named import
import axios from "axios";
import { REFRESH_TOKEN_API_URL } from "./urlsconfig";

const getTokenExpirationTime = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000;
};

const scheduleTokenRefresh = (accessToken) => {
  const expirationTime = getTokenExpirationTime(accessToken);
  const currentTime = Date.now();
  const delay = expirationTime - currentTime - 60000;

  if (delay > 0) {
    setTimeout(refreshAccessToken, delay);
  } else {
    refreshAccessToken();
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      REFRESH_TOKEN_API_URL,
      {},
      { withCredentials: true }
    );
    const { access_token } = response.data;

    localStorage.setItem("access_token", access_token);
    scheduleTokenRefresh(access_token);
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

const initialAccessToken = localStorage.getItem("access_token");
if (initialAccessToken) {
  scheduleTokenRefresh(initialAccessToken);
}

export { scheduleTokenRefresh, refreshAccessToken };
