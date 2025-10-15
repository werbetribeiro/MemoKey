import { KEYS_BASE_URL } from '@/comon/BaseURL';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: KEYS_BASE_URL
})