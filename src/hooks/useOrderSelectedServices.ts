import {useMemo} from 'react';
import {IServiceItem} from '../types/service/service';
import {formatNumber} from '../utils/formatNumber';

// THIS HOOK USED TO MAP QUANTITY OF SERVICE WITH SELECTED SERVICE ID
export const useOrderSelectedServices = (
  selectedServices: string[],
  quantityServiceMap: Map<string, string>,
  services?: IServiceItem[],
) => {
  const mergedQuantityServiceDetails = useMemo(() => {
    const details = selectedServices
      ? selectedServices?.map(item => ({
          serviceId: Number(item),
          quantity: formatNumber(quantityServiceMap.get(item) || '1'),
          name: services?.find(service => service?.id?.toString() === item)
            ?.name,
          image: services?.find(service => service?.id?.toString() === item)
            ?.image,
          price: services?.find(service => service?.id?.toString() === item)
            ?.price,
          unit: services?.find(service => service?.id?.toString() === item)
            ?.unit,
        }))
      : Array.from(quantityServiceMap).map(([key, value]) => ({
          serviceId: Number(key),
          quantity: formatNumber(value || '1'),
          name: services?.find(service => service?.id?.toString() === key)
            ?.name,
          image: services?.find(service => service?.id?.toString() === key)
            ?.image,
          price: services?.find(service => service?.id?.toString() === key)
            ?.price,
          unit: services?.find(service => service?.id?.toString() === key)
            ?.unit,
        }));

    return details;
  }, [quantityServiceMap, selectedServices, services]);

  return mergedQuantityServiceDetails;
};
