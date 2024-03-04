import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import React from 'react';
import {ILockerItem} from '../../types/locker/locker';
import {badgeRenderLockerStatus} from '../../utils/badgeRender';
import {lockerStatusColorRender} from '../../utils/lockerRender';
import {useCurrentPosition} from '../../hooks/useCurrentPosition';
import {calculateDistance} from '../../utils/calculateDistance';

interface Props extends ILockerItem {
  handlePress: () => void;
  maxW?: number;
}

const LockerCard: React.FC<Partial<Props>> = ({
  image,
  name,
  code,
  location,
  status,
  id,
  maxW,
  handlePress,
}) => {
  const currentPosition = useCurrentPosition();
  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box alignItems="center">
        <Box
          w="full"
          borderColor={lockerStatusColorRender(status)}
          borderWidth="1"
          maxW={maxW}
          rounded="lg"
          overflow="hidden"
          borderRadius="lg">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                w="full"
                h="full"
                resizeMode="cover"
                source={
                  image
                    ? {
                        uri: image,
                      }
                    : require('../../assets/lockerPlaceHolder.jpg')
                }
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3} bgColor={'white'}>
            <Stack space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack alignItems="center" space="1">
                  <Heading size="sm" ml="-1" maxW={150} isTruncated>
                    {name}
                  </Heading>

                  {currentPosition && (
                    <Heading size="sx" fontStyle="italic">
                      (
                      {calculateDistance(
                        currentPosition?.lat,
                        currentPosition?.lng,
                        location?.latitude,
                        location?.longitude,
                      ).toFixed(1)}{' '}
                      km)
                    </Heading>
                  )}
                </HStack>
              </HStack>
              <HStack
                alignItems="center"
                space="1"
                justifyContent="space-between">
                <Text fontSize="xs" color="#2051E5" fontWeight="500" ml="-0.5">
                  Mã số: {code}
                </Text>

                {badgeRenderLockerStatus(status)}
              </HStack>
            </Stack>
            <Text fontWeight="400" numberOfLines={2} ellipsizeMode="tail">
              Địa chỉ:{' '}
              {[
                location?.province?.name,
                location?.district?.name,
                location?.ward?.name,
                location?.address,
              ]
                ?.filter(item => item)
                ?.join(', ')}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

export default LockerCard;
