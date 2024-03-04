import React from 'react';
import {VStack, Text} from 'native-base';
import StoreCard from '../../../features/store/StoreCard';
import CustomSectionTitle from '../../../components/CustomSectionTitle';

const StoreSection = () => {
  return (
    <VStack space={3}>
      <CustomSectionTitle text="Cửa hàng" />
      <StoreCard />
    </VStack>
  );
};

export default StoreSection;
