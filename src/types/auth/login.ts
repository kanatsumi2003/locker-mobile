export enum DEVICE_TYPE {
  ANDROID = 'Android',
  IOS = 'Ios',
}

export interface ILoginStaffParams {
  username: string;
  password: string;
}

export interface ILoginCustomerParams {
  phoneNumber: string;
  otp: string;
}

export interface IVerifyCustomerParams {
  phoneNumber: string;
}

export interface IVerifyCustomerResponse {
  otp: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IChangePassRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IResetPassRequest {
  token: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IResetPassFormData {
  token: string;
  username: string;
}

export interface UpdateProfileParams {
  username?: string;
  phoneNumber?: string;
  fullName?: string;
  description?: string;
  avatar?: string;
}

export interface IDeviceResponse {
  id: number;
  accountId: number;
  value: string;
  expiredAt: string;
  isExpired: true;
  deviceType: DEVICE_TYPE;
}

export interface IDeviceParams {
  deviceToken: string;
  deviceType: string;
}
