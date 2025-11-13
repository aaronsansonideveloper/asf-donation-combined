export interface IIdTargetDTO {
  id: number;
}

export interface IIdsTargetDTO {
  ids: Array<number>;
}

export interface ISort { 
    [key: string]: "ASC" | "DESC";
}

export interface IBaseSearchDTO {
  ids?: Array<number>;

  created_at?: [number, number];  
  page_size?: number;
  page_number?: number;
  with_deleted?: boolean;
  sort?: ISort;
}

export interface IGeneralResponse { 
  message?: string;
  data?: unknown;
  count?: number;
}
