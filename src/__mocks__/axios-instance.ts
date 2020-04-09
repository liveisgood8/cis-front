import AxiosMock from 'axios-mock-adapter';
import { AxiosService } from '../services/axios.service';

export function mockAxios() {
  return new AxiosMock(AxiosService);
}
