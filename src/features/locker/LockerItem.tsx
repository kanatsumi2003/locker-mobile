import {Box, HStack, Heading, Pressable, Text, VStack, Icon} from 'native-base';
import React from 'react';
import {ILockerItem} from '../../types/locker/locker';
import {useCurrentPosition} from '../../hooks/useCurrentPosition';
import {calculateDistance} from '../../utils/calculateDistance';
import Feather from 'react-native-vector-icons/Feather';

interface Props extends ILockerItem {
  handlePress: () => void;
  maxW?: number;
}

const LockerItem: React.FC<Partial<Props>> = ({
  name,
  location,
  id,
  maxW,
  handlePress,
}) => {
  const currentPosition = useCurrentPosition();
  return (
    <Pressable onPress={handlePress}>
      <Box
        p="2"
        minW={80}
        w="full"
        rounded="lg"
        overflow="hidden"
        background="blue.50"
        borderRadius="lg">
        <HStack alignItems="center" space="4">
          <VStack alignItems="center" bg="red.500" rounded="lg" p="2">
            <Icon color="white" size="xs" as={<Feather name="map-pin" />} />
            {currentPosition && (
              <>
                <Text color="white" fontSize="xs">
                  {calculateDistance(
                    currentPosition?.lat,
                    currentPosition?.lng,
                    location?.latitude,
                    location?.longitude,
                  ).toFixed(1)}{' '}
                </Text>
                <Text color="white" fontSize="xs" lineHeight="xs">
                  km
                </Text>
              </>
            )}
          </VStack>

          <VStack justifyContent="space-between" maxW="full" flex="1">
            <Heading size="xs" maxW="full" isTruncated mb="2">
              {name}
            </Heading>

            <Text lineHeight="xs" numberOfLines={2} ellipsizeMode="tail">
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
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default LockerItem;
