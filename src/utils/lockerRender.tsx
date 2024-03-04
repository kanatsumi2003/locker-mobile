import {LOCKER_STATUS} from '../types/locker/locker';

export const lockerStatusColorRender = (value: LOCKER_STATUS | undefined) => {
  switch (value) {
    case LOCKER_STATUS.ACTIVE:
      return 'success.500';
    case LOCKER_STATUS.INACTIVE:
    case LOCKER_STATUS.DISCONNECTED:
      return 'error.500';
    case LOCKER_STATUS.MAINTAINING:
      return 'warning.500';
    default:
      return 'info.500';
  }
};
