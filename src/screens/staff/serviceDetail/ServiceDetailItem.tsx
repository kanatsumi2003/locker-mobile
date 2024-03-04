import {AspectRatio, Box, HStack, Heading, Image, VStack} from 'native-base';
import React from 'react';
import {Text} from 'react-native';
import {IDetailItemServiceItem} from '../../../types/order/order';

interface Props extends IDetailItemServiceItem {}

const ServiceDetailItem: React.FC<Partial<Props>> = ({
  image,
  type,
  description,
}) => {
  return (
    <Box
      w="full"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      mb={2}
      borderRadius="lg">
      <HStack space={3}>
        <Box>
          <AspectRatio w="24" alignItems={'center'} ratio={4 / 3}>
            <Image
              resizeMode="cover"
              source={{
                uri: image,
              }}
              alt="image"
              w="full"
              h="full"
            />
          </AspectRatio>
        </Box>

        <VStack py="4" justifyContent="center" space={1}>
          <Heading size="xs">{type}</Heading>
          <Text>{description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ServiceDetailItem;
