import {VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import Options from '../../../features/option';

const OptionSection = () => {
  return (
    <VStack space={4}>
      <CustomSectionTitle text="Dịch vụ" />
      <Options />
    </VStack>
  );
};

export default OptionSection;
