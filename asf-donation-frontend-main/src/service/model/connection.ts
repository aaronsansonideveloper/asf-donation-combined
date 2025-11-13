import { IBaseModel } from './base';

export enum ConnectionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  IGNORED = 'IGNORED',
}

export interface IConnection {
  connected_user_avatar?: string;
  connected_user_id: number;
  connecter_user_id: number;
  created_at: string;
  deal_id?: number;
  deal_name?: string;
  id: number;
  status: ConnectionStatus;
  note?: string;
  title: string;

  first_name: string;
  last_name: string;
}

export interface IConnectionForChatitem {
  first_name: string;
  last_name: string;
  title: string;
  connection: IConnection;
}

export interface IConnectionQueryParams {
  connection_id: number;
}

export interface IConnectionRequestPayload {
  target_user_id: number;
  note: string;
  deal_name: string;
  deal_id: number;
}
