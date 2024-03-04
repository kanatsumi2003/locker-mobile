import React from 'react';
import {IShippingPriceItem} from '../../types/setting';
import {Heading, HStack, Stack, Text} from 'native-base';
import {formatDecimal} from '../../utils/formatDecimal';

interface Props {
  dataShippingFee: IShippingPriceItem[];
}

const SettingShippingFeeCard: React.FC<Props> = ({dataShippingFee}) => {
  return (
    <Stack p="4" space={3} bgColor="blue.500" rounded="lg" shadow="2">
      {dataShippingFee?.map(item => (
        <HStack
          key={item?.id}
          alignItems="center"
          justifyContent="space-between">
          <Text color="white">Từ {item?.fromDistance} km:</Text>
          <Heading size="sm" color="white">
            {formatDecimal(item?.price)} VND
          </Heading>
        </HStack>
      ))}
    </Stack>
  );
};

export default SettingShippingFeeCard;
