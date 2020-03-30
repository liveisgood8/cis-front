import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export enum Errors {
  /** Неизвестная ошибка */
  UNKNOWN_ERROR = 1,
  /** Маршрут не существует */
  PATH_NOT_FOUND,
  /** Ошибка в работе сервиса */
  SERVICE_ERROR,
  /** Ошибка проверки корректности данных запроса */
  REQUEST_VALIDATE_ERROR,
  /** Ошибка при добавлении сущности в базу данных */
  INSERT_ENTITY_ERROR,
  /** Ошибка при обновлении сущности в базе данных */
  UPDATE_ENTITY_ERROR,
  /** Пользователь с указанными логином не найден */
  AUTH_USER_NOT_FOUND,
  /** Пользователь с указанным логином уже существует */
  REGISTER_USER_IS_EXIST,
  /** Неверный пароль пользователя */
  AUTH_WRONG_PASSWORD,
  /** Ошибка при загрузке файла на сервер */
  FILE_UPLOAD_ERROR,
  /** Неизвестный идентификатор права */
  UNKNOWN_PERMISSION_ID,
  /** Нет прав для доступа к данном ресурсу */
  NO_PERMISSION_FOR_RESOURCE,
}

function codeToMessage(code: Errors): string | undefined {
  switch (code) {
    case Errors.PATH_NOT_FOUND:
      return 'Маршрут не существует';
    case Errors.SERVICE_ERROR:
      return 'Ошибка в работе сервиса';
    case Errors.REQUEST_VALIDATE_ERROR:
      return 'Некорректный данные в запросе';
    case Errors.INSERT_ENTITY_ERROR:
      return 'Ошибка при добавлении данных в базу данных';
    case Errors.UPDATE_ENTITY_ERROR:
      return 'Ошибка при обновлении данных в базе данных ';
    case Errors.AUTH_USER_NOT_FOUND:
      return 'Пользователь с указанными логином не найден';
    case Errors.REGISTER_USER_IS_EXIST:
      return 'Пользователь с указанным логином уже существует ';
    case Errors.AUTH_WRONG_PASSWORD:
      return 'Неверный пароль пользователя';
    case Errors.FILE_UPLOAD_ERROR:
      return 'Ошибка при загрузке файла на сервер';
    case Errors.UNKNOWN_PERMISSION_ID:
      return 'Неизвестный идентификатор права';
    case Errors.NO_PERMISSION_FOR_RESOURCE:
      return 'Нет прав для доступа к данном ресурсу';
  }
}

export const handleAxiosError = (
  err: AxiosError, defaultMessage: string,
): void => {
  let message = '';
  if (err.code === 'ECONNABORTED') {
    message = 'Не удалось подключиться к серверу';
  }
  if (err.response?.data.code) {
    message += codeToMessage(err.response.data.code);
  }
  if (err.response?.data.message) {
    if (message) {
      message += '\n';
    }
    message += err.response.data.message;
  }
  toast.error(message || defaultMessage);
};
