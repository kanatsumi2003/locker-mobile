import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AspectRatio,
  Center,
  Heading,
  HStack,
  ICenterProps,
  Icon,
  Image,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';
import React from 'react';
import {HomeStackParamList} from '../../navigation/staff/TabNavigationStaff';
import {IBoxOrder} from '../../types/box/box';
import Feather from 'react-native-vector-icons/Feather';
import {badgeRenderOrderStatus} from '../../utils/badgeRender';
import {orderTypeImageRender} from '../../utils/orderRender';

interface Props extends ICenterProps {
  icon: React.JSX.Element;
  iconColor?: IColors;
  number?: number;
  description?: string;
  lastOrder?: IBoxOrder;
  isAvailable?: boolean;
  title?: string;
  onPress?: () => void;
}

const BoxLayout: React.FC<Props> = ({
  icon,
  iconColor,
  number,
  description,
  lastOrder,
  isAvailable,
  title,
  onPress,
  bg,
  ...props
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <Pressable
      onPress={() => {
        onPress
          ? onPress()
          : navigation.navigate('StaffBoxDetail', {
              number,
              description,
              lastOrder,
              isAvailable,
            });
      }}>
      <Center
        {...props}
        position="relative"
        flex={1}
        w="40"
        h="40"
        rounded="lg"
        shadow="2"
        bg={bg}>
        <Text
          color="gray.500"
          position="absolute"
          top="4"
          left="4"
          fontSize="14">
          {number}
        </Text>
        <Icon
          size="lg"
          color={iconColor}
          as={icon}
          position="absolute"
          top="4"
          right="2"
        />
        <VStack alignItems="center" justifyContent="center">
          <AspectRatio w="20" alignItems={'center'} ratio={4 / 3}>
            <Image
              resizeMode="contain"
              source={orderTypeImageRender(lastOrder?.type)}
              alt="image"
              w="full"
              h="full"
            />
          </AspectRatio>
          {lastOrder?.status && badgeRenderOrderStatus(lastOrder?.status)}
        </VStack>
        {title && (
          <HStack alignItems="center" mt="4" space="1">
            <Heading size="xs" color="gray.600">
              {title}
            </Heading>
            <Icon color="gray.500" as={<Feather name="arrow-right" />} />
          </HStack>
        )}
      </Center>
    </Pressable>
  );
};

export default BoxLayout;
