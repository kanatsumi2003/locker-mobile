export interface IAddress {
  code: string;
  name: string;
  parentCode: string;
}

export interface IAddressResponse {
  items: IAddress[];
}

export interface ILocation {
  id: number;
  address: string;
  longitude?: number;
  latitude?: number;
  description: string;
  province: IAddress;
  district: IAddress;
  ward: IAddress;
}

export interface ILocationBody {
  address: string;
  longitude?: number;
  latitude?: number;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}

export interface ILocationParams {
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
}
