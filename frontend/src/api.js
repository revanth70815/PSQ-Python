import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  withCredentials: true,
})

export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')

export const submitPsq = (type, data) => api.post(`/psq/${type}`, data)
export const getPsqSubmissions = (type) => api.get(`/psq/${type}`)

export const getNomineeDashboard = () => api.get('/dashboard/nominee')
export const getOfficerDashboard = () => api.get('/dashboard/officer')
