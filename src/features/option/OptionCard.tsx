import {AspectRatio, Box, Heading, Image, Pressable} from 'native-base';
import React from 'react';
import {ImageSourcePropType} from 'react-native';
interface Props {
  handlePress: () => void;
  imagePath: ImageSourcePropType | undefined;
  heading: string;
}

const OptionCard: React.FC<Props> = ({handlePress, imagePath, heading}) => {
  return (
    <Pressable alignItems="center" onPress={handlePress}>
      <Box
        shadow={1}
        p="4"
        w="full"
        maxW={32}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'white',
        }}
        _light={{
          backgroundColor: 'white',
        }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={imagePath}
              alt="image"
              resizeMode="contain"
              w="full"
              h="full"
            />
          </AspectRatio>
        </Box>
        <Heading textAlign="center" size="sm" ml="-1" mt={2} isTruncated>
          {heading}
        </Heading>
      </Box>
    </Pressable>
  );
};

export default OptionCard;
