import {Center, Skeleton} from 'native-base';
import React from 'react';

const CustomSkeletonBox = () => {
  return (
    <Center w="100%">
      <Skeleton size={40} rounded="md" />
    </Center>
  );
};

export default CustomSkeletonBox;
