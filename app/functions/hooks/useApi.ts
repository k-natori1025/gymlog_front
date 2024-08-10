import axios from 'axios';
import { User, getIdToken } from 'firebase/auth';
import { auth } from '../libs/firebase';
import { useMemo } from 'react';

export const useApi = () => {
  return useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const user: User | null = auth.currentUser;
          if (user) {
            const token = await getIdToken(user, true) // forceRefresh set to true
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
          }
        } catch (error) {
          console.error('Error getting auth token:', error);
        }
        return config;   
      },
      (error) => {
        return Promise.reject(error)
      }
    );
  
    return axiosInstance;
  }, []) // Empty dependency array means this will only be created once
};
