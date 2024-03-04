export const formatDecimal = (value: number | string | undefined) => {
  return value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
};

export const parseDecimal = (value: number | string | undefined) => {
  return value ? `${value}`.replaceAll(/,/g, '') : '';
};
