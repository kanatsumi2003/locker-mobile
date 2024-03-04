import {Text, VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../components/CustomSectionTitle';

interface Props {
  description?: string;
}

const CustomerOrderNoteDetailSection: React.FC<Props> = ({description}) => {
  return (
    <VStack space={4} mt="4">
      <CustomSectionTitle text="Ghi chú của khách hàng" />

      <Text fontStyle="italic" mb="4">
        {description}
      </Text>
    </VStack>
  );
};

export default CustomerOrderNoteDetailSection;
