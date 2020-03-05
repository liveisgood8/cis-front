import Axios from 'axios';
import { getAuthenticateData } from './auth.service';

export const AxiosService = Axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 2000,
  headers: {
    Authorization: `Bearer ${getAuthenticateData()?.accessToken}`,
  },
});
