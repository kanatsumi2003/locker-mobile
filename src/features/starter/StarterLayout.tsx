import {Center, HStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactElement;
}

const StarterLayout: React.FC<Props> = ({children}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
      }}>
      <Center h="full" w="full" bg="white" p="4">
        <HStack w="full" space="10" justifyContent="center">
          {children}
        </HStack>
      </Center>
    </SafeAreaView>
  );
};

export default StarterLayout;
