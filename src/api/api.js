import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const api = axios.create({
  baseURL: "https://your-api.com",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post("https://your-api.com/refresh-token", { refreshToken });
        const { token: newToken, expiresIn } = response.data;

        localStorage.setItem("token", newToken);
        localStorage.setItem("tokenExpiry", Date.now() + expiresIn * 1000);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest); // retry request
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiry");
        history.push("/login");
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
