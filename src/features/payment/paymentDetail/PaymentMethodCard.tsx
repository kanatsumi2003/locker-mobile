import {Box, HStack, Heading, Image, Pressable} from 'native-base';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
interface Props {
  handlePress: () => void;
  imagePath: ImageSourcePropType | undefined;
  heading: string;
}

const PaymentMethodCard: React.FC<Props> = ({
  handlePress,
  imagePath,
  heading,
}) => {
  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box
        p="4"
        h="20"
        w="full"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <HStack w="full" alignItems="center" space={3}>
          <Image
            source={imagePath}
            alt="image"
            resizeMode="contain"
            w="12"
            h="12"
          />
          <Heading textAlign="center" size="sm" ml="-1" isTruncated>
            {heading}
          </Heading>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PaymentMethodCard;
