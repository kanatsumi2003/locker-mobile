import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/StackNavigation';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  Text,
  VStack,
  View,
} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
  label: string;
  description: string;
  center?: boolean;
  preventGoBack?: boolean;
}

const AppBar: React.FC<Partial<Props>> = ({
  label,
  description,
  center,
  preventGoBack,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View zIndex="99">
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <HStack
        bg="white"
        px="1"
        py="8"
        w="100%"
        h="10"
        position="relative"
        {...(center && {justifyContent: 'center'})}>
        <HStack alignItems="center" justifyContent={'center'}>
          {!preventGoBack && (
            <IconButton
              position="absolute"
              left={8}
              top={2}
              colorScheme="warmGray"
              variant="outline"
              borderRadius="xl"
              icon={
                <Icon
                  as={<Entypo name="chevron-left" size={16} />}
                  color="gray.500"
                />
              }
              onPress={() => navigation.goBack()}
            />
          )}

          <VStack px="4">
            <Text fontSize="14">{description}</Text>
            <Text fontSize="20" fontWeight="bold">
              {label}
            </Text>
          </VStack>
        </HStack>
      </HStack>
    </View>
  );
};

export default AppBar;
