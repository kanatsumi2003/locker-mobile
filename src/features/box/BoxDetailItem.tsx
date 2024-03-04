import {RouteProp, useRoute} from '@react-navigation/core';
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import CustomBadge from '../../components/CustomBadge';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';

const BoxDetailItem = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffBoxDetail'>>();

  return (
    <Box
      w="full"
      rounded="lg"
      overflow="hidden"
      borderColor={route.params?.isAvailable ? 'success.500' : 'red.500'}
      borderWidth="1"
      mb={2}
      bg="white">
      <HStack space={3} alignItems="center" p="4">
        <Box>
          <AspectRatio w="10" alignItems={'center'} ratio={4 / 3}>
            <Image
              resizeMode="contain"
              source={
                route.params?.isAvailable
                  ? require('../../assets/unbox.png')
                  : require('../../assets/box.png')
              }
              alt="image"
              w="full"
              h="full"
            />
          </AspectRatio>
        </Box>

        <VStack py="4" justifyContent="center" space={1} flex="1">
          <Heading size="xs">Ô tủ {route.params?.number}</Heading>
          {route.params?.description && (
            <Text>{route.params?.description}</Text>
          )}
        </VStack>

        {route.params?.isAvailable ? (
          <CustomBadge text="Còn trống" colorScheme="success" />
        ) : (
          <CustomBadge text="Đã đặt" colorScheme="error" />
        )}
      </HStack>
    </Box>
  );
};

export default BoxDetailItem;
