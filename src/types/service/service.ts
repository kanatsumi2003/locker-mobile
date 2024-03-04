import type {Paging, PagingParams, Response, Timestamp} from '..';

export enum FEE_TYPE {
  BY_TIME = 'ByTime',
  BY_UNIT = 'ByUnitPrice',
  BY_INPUT = 'ByInputPrice',
}

export enum SERVICE_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface IServiceItem extends Timestamp {
  id: number;
  storeId?: number;
  name: string;
  image: string;
  price: number;
  description: string;
  unit: string;
  status: SERVICE_STATUS;
  isStandard: boolean;
}

export interface IServiceParams extends PagingParams {
  search?: string;
  status?: SERVICE_STATUS;
  excludedIds?: number[];
  lockerId?: number;
}

export interface IOrderServiceItemBody {
  serviceId: number;
  quantity: number;
}
