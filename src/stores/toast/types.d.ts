export interface IToastDefinition {
  type: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';
  title: string;
  message: string;
}

export interface IToastState {
  readonly toasts: IToastDefinition[];
}
