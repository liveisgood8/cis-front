export interface IClient {
  name: string;
}

export interface IContract {
  name: string;
}

export interface ITask {
  name: string;
}

export interface IBusinessEntities {
  clients: IClient[];
  contracts: IContract[];
  tasks: ITask[];
  error?: string;
}
