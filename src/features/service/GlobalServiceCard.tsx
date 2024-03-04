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
import {IServiceItem} from '../../types/service/service';
import {formatDecimal} from '../../utils/formatDecimal';

interface Props extends IServiceItem {
  maxW?: number;
}

const GlobalServiceCard: React.FC<Partial<Props>> = ({
  image,
  name,
  price,
  unit,
}) => {
  return (
    <Box alignItems="center">
      <Box
        w="full"
        borderColor="coolGray.200"
        borderWidth="1"
        maxW="48"
        rounded="lg"
        overflow="hidden"
        borderRadius="lg">
        <Box>
          <AspectRatio w="100%" ratio={4 / 3}>
            <Image
              source={{
                uri: image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={4} bgColor={'white'}>
          <Stack space={2}>
            <HStack justifyContent="space-between">
              <Heading size="sm" maxW={150} isTruncated>
                {name}
              </Heading>
            </HStack>
          </Stack>
          <Text fontWeight="400">
            Giá: {formatDecimal(price)} VND / {unit}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default GlobalServiceCard;
