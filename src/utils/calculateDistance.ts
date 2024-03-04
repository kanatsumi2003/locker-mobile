export const calculateDistance = (
  lat1?: number | null,
  long1?: number | null,
  lat2?: number | null,
  long2?: number | null,
): number => {
  if (!lat1 || !long1 || !lat2 || !long2) {
    return 0;
  }

  const d1: number = lat1 * (Math.PI / 180.0);
  const num1: number = long1 * (Math.PI / 180.0);
  const d2: number = lat2 * (Math.PI / 180.0);
  const num2: number = long2 * (Math.PI / 180.0) - num1;
  const d3: number =
    Math.pow(Math.sin((d2 - d1) / 2.0), 2.0) +
    Math.cos(d1) * Math.cos(d2) * Math.pow(Math.sin(num2 / 2.0), 2.0);
  return 6371 * (2.0 * Math.atan2(Math.sqrt(d3), Math.sqrt(1.0 - d3)));
};
