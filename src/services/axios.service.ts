import axios from 'axios';
import { getAuthenticateData } from './auth.service';

export const serverBaseUrl = 'http://localhost:8080';
export const apiBaseUrl = serverBaseUrl + '/api/v1';

export const AxiosService = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${getAuthenticateData()?.accessToken}`,
  },
});
