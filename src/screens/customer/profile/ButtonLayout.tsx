import React from 'react';
import {HStack, Icon, Pressable, Text, View} from 'native-base';
import {IHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import Feather from 'react-native-vector-icons/Feather';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';

interface Props extends IHStackProps {
  icon: React.ReactNode;
  text: string;
  handlePress?: () => void;
  textColor?: IColors;
}

const ButtonLayout: React.FC<Partial<Props>> = ({
  handlePress,
  icon,
  text,
  bg = 'white',
  color = 'blue.500',
  borderColor = 'blue.500',
  textColor = 'black',
  ...props
}) => {
  return (
    <HStack
      onTouchEnd={handlePress}
      bg={bg}
      borderWidth="1"
      borderColor={borderColor}
      w="full"
      rounded="lg"
      p="2"
      shadow="2"
      alignItems="center"
      justifyContent="space-between">
      <HStack alignItems="center" space="2">
        <View h="8" p="2" bg="white" rounded="lg">
          <Icon as={icon} color={color} />
        </View>
        <Text color={textColor}>{text}</Text>
      </HStack>
      <Icon as={<Feather name="chevron-right" size={16} />} color={textColor} />
    </HStack>
  );
};

export default ButtonLayout;
