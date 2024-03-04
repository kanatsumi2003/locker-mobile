import React from 'react';
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {formatDecimal} from '../../utils/formatDecimal';
import {IDetailItem} from '../../types/order/order';

export const ServiceDetailItem = <T extends Partial<IDetailItem>>({
  item,
  handlePress,
}: {
  item: T;
  index?: number;
  handlePress?: (item: T) => void;
}) => {
  return (
    <Box
      w="full"
      rounded="sm"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
      mt={2}
      mb={2}
      borderRadius="lg">
      <Pressable
        onPress={() => handlePress && handlePress(item)}
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}>
        <Box>
          <HStack alignItems="center" space={3}>
            <AspectRatio w="24" ratio={4 / 3}>
              <Image
                resizeMode="cover"
                source={{
                  uri: item?.service?.image,
                }}
                alt="image"
                w="full"
                h="full"
              />
            </AspectRatio>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                bold>
                {item?.service?.name}
              </Text>

              <HStack space={1}>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Giá cả:
                </Text>
                <Text>
                  {formatDecimal(item?.price)} VND / {item?.service?.unit}
                </Text>
              </HStack>

              <HStack space={1}>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  Số lượng:
                </Text>
                <Text>{item?.quantity}</Text>
              </HStack>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};
