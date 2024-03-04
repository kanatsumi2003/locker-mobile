import React from 'react';
import OptionCard from './OrderTypeCard';

const OrderTypeStorage = () => {
  const handlePress = () => {};

  return (
    <OptionCard
      handlePress={handlePress}
      imagePath={require('../../assets/storage.png')}
      heading="Giữ đồ"
    />
  );
};

export default OrderTypeStorage;
