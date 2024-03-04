export interface InformationSettings {
  companyName?: string;
  contactPhone?: string;
  contactEmail?: string;
  facebook?: string;
  zalo?: string;
  openedAt?: string;
  closedAt?: string;
}

export interface AccountSettings {
  maxWrongLoginCount: number;
  wrongLoginBlockTimeInMinutes: number;
}

export interface OrderSettings {
  initTimeoutInMinutes: number;
  reservationInitTimeoutInMinutes: number;
  storagePrice: number;
  maxTimeInHours: number;
  extraFee: number;
  maxActiveOrderCount: number;
  reservationFee: number;
  minTimeProcessLaundryOrderInHours: number;
}

export interface ZaloAuthSettings {
  accessToken?: string;
  refreshToken?: string;
}

export interface TimeSettings {
  timeZone?: string;
}

export interface LockerSettings {
  availableBoxCountWarning: number;
}

export interface PaymentSettings {
  paymentTimeoutInMinutes: number;
  minDeposit: 0;
}

export interface Settings {
  informationSettings: InformationSettings;
  accountSettings: AccountSettings;
  orderSettings: OrderSettings;
  zaloAuthSettings: ZaloAuthSettings;
  timeSettings: TimeSettings;
  lockerSettings: LockerSettings;
  paymentSettings: PaymentSettings;
}

export interface SettingsParams {}

export interface UpdateSettingsParams {
  informationSettings?: InformationSettings;
  accountSettings?: AccountSettings;
  orderSettings?: OrderSettings;
  zaloAuthSettings?: ZaloAuthSettings;
  timeSettings?: TimeSettings;
  LockerSettings?: LockerSettings;
}

export interface IShippingPriceItem {
  id: number;
  fromDistance: number;
  price: number;
}
