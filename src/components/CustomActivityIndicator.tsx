import {Center, Spinner} from 'native-base';
import React from 'react';

const CustomActivityIndicator = () => {
  return (
    <Center flex={1}>
      <Spinner color="blue.500" />
    </Center>
  );
};

export default CustomActivityIndicator;
