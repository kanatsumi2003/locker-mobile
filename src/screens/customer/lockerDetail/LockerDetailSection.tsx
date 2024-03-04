import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VStack, View, Image} from 'native-base';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import LockerCard from '../../../features/locker/LockerCard';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {ILockerItem} from '../../../types/locker/locker';
import OrderTypeSection from './OrderTypeSection';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';
import {IBoxItem} from '../../../types/box/box';

interface Props extends ILockerItem {
  isFetching?: boolean;
  isLoading?: boolean;
  dataBoxes?: IBoxItem[];
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
            navigation.navigate('CustomerLockerDetail', {id: data?.id})
          }
        />
      )}

      <CustomSectionTitle text="Bản đồ" />
      <View w="full" h="56" borderRadius="lg" overflow={'hidden'}>
        <MapView
          style={{
            borderRadius: 100,
            height: '100%',
          }}
          initialRegion={{
            latitude: data?.location?.latitude || 37.78825,
            longitude: data?.location?.longitude || -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          region={{
            latitude: data?.location?.latitude || 37.78825,
            longitude: data?.location?.longitude || -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: data?.location?.latitude || 37.78825,
              longitude: data?.location?.longitude || -122.4324,
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

      <OrderTypeSection orderTypes={data?.orderTypes} locker={data} />
    </VStack>
  );
};

export default LockerDetailSection;
