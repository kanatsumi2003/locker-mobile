import {Box, Center} from 'native-base';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
}

const CustomSpinner: React.FC<Props> = ({visible}) => {
  return (
    <Spinner
      visible={visible}
      animation={'none'}
      customIndicator={
        <Box bg="white" w="32" h="32" borderRadius="xl">
          <Center>
            <LottieView
              style={{
                width: 72,
                height: 72,
              }}
              source={require('../assets/washing-machine.json')}
              autoPlay
              loop
            />
            <LottieView
              style={{
                width: 72,
                height: 72,
              }}
              source={require('../assets/loading.json')}
              autoPlay
              loop
            />
          </Center>
        </Box>
      }
    />
  );
};

export default CustomSpinner;
