import {HStack} from 'native-base';
import React from 'react';

interface Props {
  children: React.ReactElement[];
}

const OrderTypeLayout: React.FC<Props> = ({children}) => {
  return (
    <HStack w="full" space="10" justifyContent="center">
      {children}
    </HStack>
  );
};

export default OrderTypeLayout;
