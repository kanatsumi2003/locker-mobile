import {Box, HStack, Image, Pressable, View, Text} from 'native-base';
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
        shadow="1"
        borderWidth="1"
        borderColor="blue.500"
        bg="white">
        <HStack w="full" alignItems="center" space={4}>
          <View bg="white" rounded="lg">
            <Image
              source={imagePath}
              alt="image"
              resizeMode="contain"
              w="12"
              h="12"
            />
          </View>
          <Text fontWeight="semibold" textAlign="center" ml="-1" isTruncated>
            {heading}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PaymentMethodCard;
