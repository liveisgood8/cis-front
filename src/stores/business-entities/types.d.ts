export interface IBaseBusinessEntity {
  id: number;
  name: string;
}

export interface IClient extends IBaseBusinessEntity {
  email?: string;
  address?: string;
  comment?: string;
}

export interface IContract extends IBaseBusinessEntity {
  client?: IClient;
  conclusionDate: Date;
  copyPath?: string;
  comment?: string;
}

export interface ITask extends IBaseBusinessEntity {
  contract?: IContract;
  doneTo: Date;
  description: string;
}

export interface IBusinessEntities {
  clients: IClient[];
  contracts: IContract[];
  tasks: ITask[];
}
