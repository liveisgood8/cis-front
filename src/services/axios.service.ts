import Axios from 'axios';

export const AxiosService = Axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 1000,
});
