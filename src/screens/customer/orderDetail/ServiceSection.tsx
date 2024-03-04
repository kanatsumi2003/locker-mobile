import {VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import ServiceSwipeList from '../../../features/service/ServiceSwipeList';

const ServiceSection = () => {
  return (
    <VStack space={4}>
      <CustomSectionTitle text="Chi tiết" />

      <ServiceSwipeList />
    </VStack>
  );
};

export default ServiceSection;
