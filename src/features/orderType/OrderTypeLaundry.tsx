import React from 'react';
import OptionCard from './OrderTypeCard';

const OrderTypeLaundry = () => {
  const handlePress = () => {};

  return (
    <OptionCard
      handlePress={handlePress}
      imagePath={require('../../assets/laundry-order.png')}
      heading="Giặt sấy"
    />
  );
};

export default OrderTypeLaundry;
