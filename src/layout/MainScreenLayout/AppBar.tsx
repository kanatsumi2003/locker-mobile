import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HStack, Icon, IconButton, Text} from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';

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
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <>
      {/* <StatusBar barStyle="light-content" /> */}
      <HStack
        w="100%"
        position="relative"
        {...(center && {justifyContent: 'center'})}>
        <HStack alignItems="center" justifyContent={'center'} w="full" h="full">
          {!preventGoBack && (
            <IconButton
              position="absolute"
              left={0}
              top={2}
              // colorScheme="blue"
              variant="link"
              icon={
                <Icon
                  as={<MaterialCommunityIcons name="chevron-left" size={16} />}
                  color="gray.500"
                />
              }
              onPress={() => navigation.goBack()}
            />
          )}

          <Text color="white" fontSize="20" fontWeight="bold">
            {label}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default AppBar;
