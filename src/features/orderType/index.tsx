import React from 'react';
import OrderTypeLayout from './OrderTypeLayout';
import OrderTypeView from './OrderTypeView';

const OrderTypes = () => {
  return (
    <OrderTypeLayout>
      <OrderTypeView type="Laundry" />
      <OrderTypeView type="Storage" />
    </OrderTypeLayout>
  );
};

export default OrderTypes;
