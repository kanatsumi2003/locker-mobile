import {Text, VStack} from 'native-base';
import React from 'react';
import ServiceSwipeList from '../../../features/service/ServiceSwipeList';
import CustomSectionTitle from '../../../components/CustomSectionTitle';

const ServiceSection = () => {
  return (
    <VStack space={4}>
      <CustomSectionTitle text="Chi tiết" />

      <ServiceSwipeList />
    </VStack>
  );
};

export default ServiceSection;
