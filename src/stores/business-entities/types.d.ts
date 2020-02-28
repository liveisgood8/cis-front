export interface IBaseBusinessEntity {
  id: number;
  name: string;
}

export interface IClient extends IBaseBusinessEntity {
  comment: string;
}

export interface IContract extends IBaseBusinessEntity {
  client?: IClient;
}

export interface ITask extends IBaseBusinessEntity {
  contract?: IContract;
}

export interface IBusinessEntities {
  clients: IClient[];
  contracts: IContract[];
  tasks: ITask[];
  error?: string;
}
