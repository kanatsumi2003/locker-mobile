import {Text, VStack} from 'native-base';
import React from 'react';
import CustomSectionTitle from '../../components/CustomSectionTitle';

interface Props {
  staffNote?: string;
}

const OrderNoteDetailSection: React.FC<Props> = ({staffNote}) => {
  return (
    <VStack space={4} mt="4">
      <CustomSectionTitle text="Ghi chú của nhân viên" />

      <Text fontStyle="italic" mb="4">
        {staffNote}
      </Text>
    </VStack>
  );
};

export default OrderNoteDetailSection;
