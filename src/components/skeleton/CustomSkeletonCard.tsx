import {Center, Skeleton, VStack} from 'native-base';
import React from 'react';

const CustomSkeletonCard = () => {
  return (
    <Center w="100%" mb="4">
      <VStack
        w="full"
        maxW="400"
        borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}>
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
        <Skeleton px="4" my="4" rounded="md" />
      </VStack>
    </Center>
  );
};

export default CustomSkeletonCard;
