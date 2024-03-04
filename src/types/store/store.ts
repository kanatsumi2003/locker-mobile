import type { Paging, Timestamp } from '..';
import type { ILocation } from '../location/location';

export enum STORE_STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export interface IStoreItem extends Timestamp {
  id: number;
  name: string;
  contactPhone: string;
  status: STORE_STATUS;
  location: ILocation;
  image: string;
}

export interface IStoreParams extends Partial<Paging> {
  search?: string;
  name?: string;
  status?: STORE_STATUS;
  address?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  createdFrom?: string;
  createdTo?: string;
}

export interface ICreateStoreParams {
  name: string;
  contactPhone: string;
  location: {
    address: string;
    wardCode: string;
    districtCode: string;
    provinceCode: string;
    longitude: number;
    latitude: number;
  };
  image: string;
}
