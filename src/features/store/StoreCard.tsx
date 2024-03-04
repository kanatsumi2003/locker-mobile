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
import {useSelector} from 'react-redux';
import {selectUserInfo} from '../../stores/global.store';
import {badgeRenderStoreStatus} from '../../utils/badgeRender';

const StoreCard = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Box alignItems="center">
      <Box
        w="full"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        borderRadius="lg">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              w="full"
              h="full"
              resizeMode="cover"
              source={
                userInfo?.store?.image
                  ? {
                      uri: userInfo?.store?.image,
                    }
                  : require('../../assets/placeholder-store.jpg')
              }
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={4} bgColor={'white'}>
          <Stack space={2}>
            <HStack justifyContent="space-between">
              <Heading size="sm" ml="-1" maxW="150" isTruncated>
                {userInfo?.store?.name}
              </Heading>
              {badgeRenderStoreStatus(userInfo?.store?.status)}
            </HStack>
            <Text
              fontSize="xs"
              color="#2051E5"
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              Số điện thoại: {userInfo?.store?.contactPhone}
            </Text>
          </Stack>
          <Text fontWeight="400">
            Địa chỉ:{' '}
            {[
              userInfo?.store?.location?.province?.name,
              userInfo?.store?.location?.district?.name,
              userInfo?.store?.location?.ward?.name,
              userInfo?.store?.location?.address,
            ]
              ?.filter(item => item)
              ?.join(', ')}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default StoreCard;
