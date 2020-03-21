import { IContract } from '../business-entities/types';

export interface IBusinessRequest {
  id: number;
  title: string;
  message: string;
  contract?: IContract;
}

export interface IBusinessRequestsState {
  pendingNumber: number;
  requests: IBusinessRequest[];
}
