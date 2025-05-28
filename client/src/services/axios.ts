import { useAppUserStore } from '#store'
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL

// Create an Axios instance with a base URL and credentials enabled
// This allows the client to send cookies with requests
// which is necessary for auth & CSRF protection
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
})

// Handling global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAppUserStore.getState().setUser(null)
    }
    return Promise.reject(error)
  },
)

export { api }
