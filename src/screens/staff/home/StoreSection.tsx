import {VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import StoreCard from '../../../features/store/StoreCard';

const StoreSection = () => {
  return (
    <VStack space={4}>
      <CustomSectionTitle text="Cửa hàng" />
      <StoreCard />
    </VStack>
  );
};

export default StoreSection;
