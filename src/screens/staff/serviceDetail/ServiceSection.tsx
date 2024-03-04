import {HStack, Icon, IconButton, Text, VStack} from 'native-base';
import React from 'react';
import ServiceCard from '../../../features/service/ServiceCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import CustomSectionTitle from '../../../components/CustomSectionTitle';

const ServiceSection = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffServiceDetail'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleAddServiceItem = () => {
    navigation.navigate('StaffAddServiceDetail', {
      id: route.params.id,
      detail: route.params.detail,
    });
  };

  return (
    <VStack space={4}>
      <CustomSectionTitle text="Dịch vụ" />

      <ServiceCard />

      <HStack space={2} alignItems="center" mb="4">
        <CustomSectionTitle text="Chi tiết" />
        {route.params.allowAddDetail && (
          <IconButton
            onPress={handleAddServiceItem}
            size="sm"
            colorScheme="blue"
            variant="solid"
            icon={
              <Icon
                as={<MaterialCommunityIcons name="tag-plus-outline" />}
                color="white"
              />
            }
          />
        )}
      </HStack>
    </VStack>
  );
};

export default ServiceSection;
