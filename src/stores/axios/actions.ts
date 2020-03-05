import { AxiosError } from 'axios';
import { AppThunkAction } from '../../types';
import { addToastAction } from '../toast/actions';

export const handleAxiosError = (
  err: AxiosError, defaultMessage?: string,
): AppThunkAction<void> => (dispatch): void => {
  console.error('axios error', err);
  let message = defaultMessage;
  if (err.code === 'ECONNABORTED') {
    message = 'Не удалось подключиться к серверу';
  }
  dispatch(addToastAction({
    title: 'Ошибка при получении списка клиентов',
    message: err.response?.data.message || message,
    type: 'danger',
  }));
};
