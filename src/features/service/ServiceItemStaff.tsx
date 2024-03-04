import {Box, HStack, Heading, Image, Input, Text, VStack} from 'native-base';
import React from 'react';
import {Dimensions} from 'react-native';
import {IServiceItem} from '../../types/service/service';
import {formatDecimal} from '../../utils/formatDecimal';

interface Props extends IServiceItem {
  quantityServiceMap?: Map<string, string>;
  setQuantityServiceMap?: React.Dispatch<
    React.SetStateAction<Map<string, string>>
  >;
}

const ServiceItemStaff: React.FC<Props> = ({
  image,
  name,
  price,
  unit,
  id,
  description,
  quantityServiceMap,
  setQuantityServiceMap,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const handleChangeText = (value: string) => {
    const newQuantityServiceMap = new Map(quantityServiceMap).set(
      id.toString(),
      value,
    );

    setQuantityServiceMap && setQuantityServiceMap(newQuantityServiceMap);
  };

  return (
    <Box
      w="full"
      style={{maxWidth: windowWidth - 90}}
      h="40"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      mb={2}
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
      borderRadius="lg">
      <HStack space={3} alignItems="center">
        <Box>
          <Image
            resizeMode="cover"
            source={{
              uri: image,
            }}
            alt="image"
            w="24"
            h="full"
          />
        </Box>

        <VStack py="4" justifyContent="center" space={1}>
          <Heading size="sm">{name}</Heading>

          <Text
            fontStyle="italic"
            isTruncated
            style={{maxWidth: windowWidth - 200}}>
            {description}
          </Text>

          <HStack alignItems="center" mt={1}>
            <Heading size="xs" color="gray.500" mr="2">
              Giá:
            </Heading>
            <Text>
              {formatDecimal(price)} VND / {unit}
            </Text>
          </HStack>

          <HStack alignItems="center">
            <Heading size="xs" color="gray.500" mr="2">
              Số lượng:
            </Heading>
            <HStack>
              <Input
                defaultValue="1"
                size="xl"
                w="12"
                fontSize="14"
                onChangeText={handleChangeText}
                keyboardType="numeric"
              />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ServiceItemStaff;
