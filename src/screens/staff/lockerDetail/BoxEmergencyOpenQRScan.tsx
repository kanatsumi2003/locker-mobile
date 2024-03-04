import React from 'react';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Heading} from 'native-base';
import {BarCodeReadEvent} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CustomButton from '../../../components/CustomButton';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';

const BoxEmergencyOpenQRScan = () => {
  const route =
    useRoute<RouteProp<HomeStackParamList, 'StaffBoxEmergencyOpenQRScan'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const onSuccess = (e: BarCodeReadEvent) => {
    navigation.navigate('StaffBoxEmergencyOpen', {
      id: Number(route.params!.id),
      token: e.data,
    });
  };

  return (
    <QRCodeScanner
      reactivate={true}
      showMarker
      onRead={onSuccess}
      topContent={<Heading>Quét mã QR để mở tủ</Heading>}
      bottomContent={
        <CustomButton onPress={() => navigation.goBack()} w="80">
          Quay lại
        </CustomButton>
      }
    />
  );
};

export default BoxEmergencyOpenQRScan;
