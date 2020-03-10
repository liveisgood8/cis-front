import { AxiosError } from 'axios';
import { AppThunkAction } from '../../types';
import { addToastAction } from '../toast/actions';

export const handleAxiosError = (
  err: AxiosError, defaultMessage?: string,
): AppThunkAction<void> => (dispatch): void => {
  console.error('axios error', err);
  let message;
  if (err.code === 'ECONNABORTED') {
    message = 'Не удалось подключиться к серверу';
  }
  dispatch(addToastAction({
    title: defaultMessage,
    message: err.response?.data.message || message,
    type: 'danger',
  }));
};
