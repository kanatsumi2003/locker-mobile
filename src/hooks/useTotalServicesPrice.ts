import {useMemo} from 'react';
import {IAddOrderDetailItem} from '../types/order/order';
import {IServiceItem} from '../types/service/service';
import {formatDecimal} from '../utils/formatDecimal';

// THIS HOOK USED TO CALCULATE TOTAL PRICE OF SERVICES
export const useTotalServicesPrice = (
  services: IServiceItem[] | undefined,
  details: IAddOrderDetailItem[],
) => {
  const calculateTempTotalPrice = useMemo(() => {
    let tempTotalPrice = 0;

    services?.forEach(item => {
      const quantity = details?.find(
        detail => detail.serviceId.toString() === item.id.toString(),
      )?.quantity;
      if (quantity) {
        tempTotalPrice += Number(quantity) * item.price;
      }
    });
    return formatDecimal(tempTotalPrice.toString());
  }, [services, details]);

  return calculateTempTotalPrice;
};
