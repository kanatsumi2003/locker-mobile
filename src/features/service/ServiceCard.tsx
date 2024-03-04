import {RouteProp, useRoute} from '@react-navigation/native';
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';
import {IDetailItem} from '../../types/order/order';
import {formatDecimal} from '../../utils/formatDecimal';

interface Props extends IDetailItem {
  maxW?: number;
}

const ServiceCard: React.FC<Partial<Props>> = ({maxW, service, quantity}) => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffServiceDetail'>>();

  return (
    <Box alignItems="center">
      <Box
        w="full"
        borderColor="coolGray.200"
        borderWidth="1"
        maxW={maxW}
        rounded="lg"
        overflow="hidden"
        borderRadius="lg">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: route?.params?.detail?.service?.image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={4} bgColor={'white'}>
          <Stack space={2}>
            <HStack justifyContent="space-between">
              <Heading size="sm" maxW={150} isTruncated>
                {route?.params?.detail?.service?.name}
              </Heading>
            </HStack>
          </Stack>
          <Text fontWeight="400">
            Giá: {formatDecimal(route?.params?.detail?.service?.price)} VND /{' '}
            {route?.params?.detail?.service?.unit}
          </Text>
          <Text fontWeight="400">
            Số lượng: {route?.params?.detail?.quantity}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default ServiceCard;
