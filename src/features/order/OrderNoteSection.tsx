import {TextArea, VStack} from 'native-base';
import React from 'react';
import {useDispatch} from 'react-redux';
import CustomSectionTitle from '../../components/CustomSectionTitle';
import {setOrderNote} from '../../stores/order.store';

const OrderNoteSection = () => {
  const dispatch = useDispatch();

  const handleOnChangeNote = (value: string) => {
    dispatch(setOrderNote(value));
  };

  return (
    <VStack space={4} mt="4">
      <CustomSectionTitle text="Ghi chú" />

      <TextArea
        fontSize="14"
        onChangeText={handleOnChangeNote}
        autoCompleteType={undefined}
        size="xl"
        borderRadius="lg"
        marginBottom={4}
      />
    </VStack>
  );
};

export default OrderNoteSection;
