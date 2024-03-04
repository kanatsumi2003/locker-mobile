import {AspectRatio, Center, Image, Text} from 'native-base';
import React from 'react';

interface Props {
  text?: string;
}

const Empty: React.FC<Props> = ({text}) => {
  return (
    <Center>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          maxH="56"
          w="full"
          source={require('../assets/empty.jpg')}
          alt="image"
          resizeMode="contain"
        />
      </AspectRatio>
      {text && (
        <Text fontSize="lg" mt="4">
          {text}
        </Text>
      )}
    </Center>
  );
};

export default Empty;
