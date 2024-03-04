import {VStack} from 'native-base';
import React from 'react';

interface Props {
  children: React.ReactElement[];
}

const PaymentMethodLayout: React.FC<Props> = ({children}) => {
  return (
    <VStack w="full" space="3" justifyContent="center">
      {children}
    </VStack>
  );
};

export default PaymentMethodLayout;
