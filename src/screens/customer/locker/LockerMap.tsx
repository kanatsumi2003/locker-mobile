import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Animated, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  AnimatedRegion,
  MapMarker,
  Marker,
  MarkerAnimated,
} from 'react-native-maps';
import {AnimatedMapView} from 'react-native-maps/lib/MapView';
import Feather from 'react-native-vector-icons/Feather';
import {DEFAULT_VIET_NAM_REGION} from '../../../constants/common';
import {useCurrentPosition} from '../../../hooks/useCurrentPosition';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useDashboardLockerLocationsQuery} from '../../../services/dashboardService';
import {IDashboardLockerLocationItem} from '../../../types/dashboard/dashboard';
import {LOCKER_STATUS} from '../../../types/locker/locker';
import {formatLocation} from '../../../utils/format';

const LockerMap = () => {
  const [marker, setMarker] = useState<
    MapMarker | Animated.LegacyRef<MapMarker> | null
  >(null);
  const [selectedMarker, setSelectedMarker] =
    useState<IDashboardLockerLocationItem | null>(null);
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: DEFAULT_VIET_NAM_REGION.latitude,
      longitude: DEFAULT_VIET_NAM_REGION.longitude,
      latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
      longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
    }),
  );

  const currentPosition = useCurrentPosition();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data} = useDashboardLockerLocationsQuery({
    status: LOCKER_STATUS.ACTIVE,
  });

  useEffect(() => {
    const newCoordinate = {
      latitude:
        selectedMarker?.location?.latitude || DEFAULT_VIET_NAM_REGION.latitude,
      longitude:
        selectedMarker?.location?.longitude ||
        DEFAULT_VIET_NAM_REGION.longitude,
      latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
      longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
      useNativeDriver: true,
      toValue: {x: 0.5, y: 0.5},
      duration: 500,
    };

    if (Platform.OS === 'android') {
      if (marker) {
        // marker!.current!.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }, [marker]);

  return (
    <View w="full" h="full" flex={1} position="relative">
      <Icon
        onPress={() => navigation.goBack()}
        as={<Feather name="chevron-left" />}
        position="absolute"
        top="50"
        left="6"
        size="xl"
        color="gray.500"
        zIndex="99"
      />
      <AnimatedMapView
        zoomControlEnabled={true}
        zoomEnabled={true}
        style={{
          height: '100%',
        }}
        initialRegion={{
          latitude: DEFAULT_VIET_NAM_REGION.latitude,
          longitude: DEFAULT_VIET_NAM_REGION.longitude,
          latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
          longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
        }}
        region={{
          latitude: DEFAULT_VIET_NAM_REGION.latitude,
          longitude: DEFAULT_VIET_NAM_REGION.longitude,
          latitudeDelta: DEFAULT_VIET_NAM_REGION.latitudeDelta,
          longitudeDelta: DEFAULT_VIET_NAM_REGION.longitudeDelta,
        }}>
        {currentPosition?.lat && currentPosition?.lng && (
          <Marker
            coordinate={{
              latitude: currentPosition.lat,
              longitude: currentPosition.lng,
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/user-location.png')}
              style={{width: 15, height: 15}}
              alt="marker"
            />
          </Marker>
        )}
        {data?.map(item => (
          <MarkerAnimated
            ref={makerRef => setMarker(makerRef)}
            onPress={() => setSelectedMarker(item)}
            key={item?.id}
            title={item?.name}
            coordinate={{
              latitude:
                item?.location?.latitude || DEFAULT_VIET_NAM_REGION.latitude,
              longitude:
                item?.location?.longitude || DEFAULT_VIET_NAM_REGION.longitude,
            }}>
            <Animated.Image
              resizeMode="contain"
              source={require('../../../assets/location.png')}
              style={{width: 20, height: 20}}
              alt="marker"
            />
          </MarkerAnimated>
        ))}
      </AnimatedMapView>
      {selectedMarker && (
        <Center
          background="white"
          zIndex="99"
          bottom="40"
          rounded="md"
          mx="4"
          p="4">
          <HStack alignItems="center" space={4}>
            <Image
              source={require('../../../assets/location.png')}
              w="10"
              h="10"
              alt="marker"
            />
            <VStack flex="1" space={2}>
              <Heading size="md">{selectedMarker?.name}</Heading>
              <Text>
                {formatLocation(
                  selectedMarker?.location?.province?.name,
                  selectedMarker?.location?.district?.name,
                  selectedMarker?.location?.ward?.name,
                  selectedMarker?.location?.address,
                )}
              </Text>
            </VStack>
          </HStack>
        </Center>
      )}
    </View>
  );
};

export default LockerMap;
