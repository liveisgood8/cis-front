export interface IBusinessRequest {
  id: number;
  message: string;
}

export interface IBusinessRequestsState {
  pendingNumber: number;
  requests: IBusinessRequest[];
}
