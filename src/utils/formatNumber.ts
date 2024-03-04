import {REPLACE_TO_NUMERIC_REG} from '../constants/common';

export const formatNumber = (value: string): number => {
  return Number(value.replace(REPLACE_TO_NUMERIC_REG, ''));
};
