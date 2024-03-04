export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}

export interface Response<T> extends Partial<Paging> {
  items: T[];
}

export interface Paging {
  pageNumber: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalCount: number;
  sortColumn?: string;
  sortDir?: SortDir;
}

export interface PagingParams {
  pageNumber: number;
  pageSize: number;
}

export interface OptionType {
  label: string;
  value: string;
}

export interface Timestamp {
  createdAt: string;
  createdBy?: number;
  updatedAt: string;
  updatedBy?: number;
  deletedAt: string;
  deletedBY?: number;
}

export declare type SortDir = 'Asc' | 'Desc';

export declare type StarterType = 'staff' | 'customer';

export declare type OptionActionType = 'order' | 'reservation';
