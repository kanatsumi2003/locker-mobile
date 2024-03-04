import React from 'react';
import {View} from 'react-native';

import {OrderTypeOptions} from '../../types/order/order';
import OrderTypeLaundry from './OrderTypeLaundry';
import OrderTypeStorage from './OrderTypeStorage';

interface Props {
  type: OrderTypeOptions;
}

const views = {
  Laundry: OrderTypeLaundry,
  Storage: OrderTypeStorage,
};

const OrderTypeView: React.FC<Props> = ({type}) => {
  const OrderTypeViewItem = views[type];

  return (
    <View>
      <OrderTypeViewItem />
    </View>
  );
};

export default OrderTypeView;
