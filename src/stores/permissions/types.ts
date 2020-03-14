export enum UserPermissions {
  /** Добавление новых клиентов */
  ADD_CLIENTS = 1,
  /** Добавление новых договоров */
  ADD_CONTRACTS,
  /** Добавление новых задач */
  ADD_TASKS,
  /** Регистрация обращений */
  REGISTER_REQUEST,
}

export interface IPermissionsState {
  userPermissions: UserPermissions[];
}
