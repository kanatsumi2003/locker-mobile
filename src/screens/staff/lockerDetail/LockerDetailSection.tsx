import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Skeleton, Text, VStack, View} from 'native-base';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {DEFAULT_VIET_NAM_REGION} from '../../../constants/common';
import LockerCard from '../../../features/locker/LockerCard';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {ILockerItem} from '../../../types/locker/locker';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';

interface Props extends ILockerItem {
  isFetching?: boolean;
  isLoading?: boolean;
}

const LockerDetailSection: React.FC<Partial<Props>> = ({
  isFetching,
  isLoading,
  ...data
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <VStack space={4}>
      <CustomSectionTitle
        text="Locker"
        subText={`(${data.availableBoxCount}/${data.boxCount} ô tủ còn trống)`}
      />

      {isLoading ? (
        <CustomSkeletonCard />
      ) : (
        <LockerCard
          {...data}
          handlePress={() =>
            navigation.navigate('StaffLockerDetail', {id: data?.id})
          }
        />
      )}

      <View w="full" h="56" borderRadius="lg" overflow={'hidden'}>
        <MapView
          style={{
            height: '100%',
          }}
          initialRegion={{
            latitude:
              data?.location?.latitude || DEFAULT_VIET_NAM_REGION.latitude,
            longitude:
              data?.location?.longitude || DEFAULT_VIET_NAM_REGION.longitude,
            latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
            longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
          }}
          region={{
            latitude:
              data?.location?.latitude || DEFAULT_VIET_NAM_REGION.latitude,
            longitude:
              data?.location?.longitude || DEFAULT_VIET_NAM_REGION.longitude,
            latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
            longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
          }}>
          <Marker
            coordinate={{
              latitude:
                data?.location?.latitude || DEFAULT_VIET_NAM_REGION.latitude,
              longitude:
                data?.location?.longitude || DEFAULT_VIET_NAM_REGION.longitude,
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/location.png')}
              style={{width: 20, height: 20}}
              alt="marker"
            />
          </Marker>
        </MapView>
      </View>
    </VStack>
  );
};

export default LockerDetailSection;
