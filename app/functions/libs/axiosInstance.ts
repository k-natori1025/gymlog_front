import axios from 'axios';
import { getIdToken } from 'firebase/auth';
import { auth } from '../libs/firebase';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, 
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getIdToken(auth.currentUser!);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
