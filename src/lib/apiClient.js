import axios from "axios";
import Cookies  from "js-cookie";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('auth_token')

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token')
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)