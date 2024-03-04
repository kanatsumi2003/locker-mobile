import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HStack, Icon, IconButton, VStack} from 'native-base';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useOrderQuery} from '../../../services/orderService';

const ServiceItemSection = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffServiceDetail'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {data, isFetching, isLoading, refetch} = useOrderQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id},
  );

  const handleAddServiceItem = () => {
    navigation.navigate('StaffAddServiceDetail', {
      id: route.params.id,
      detail: route.params.detail,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  return (
    <VStack space={6}>
      <HStack space={2} alignItems="center">
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

export default ServiceItemSection;
