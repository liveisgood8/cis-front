export interface IBusinessRequest {
  id: number;
  title: string;
  message: string;
}

export interface IBusinessRequestsState {
  pendingNumber: number;
  requests: IBusinessRequest[];
}
