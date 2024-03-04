import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import CustomSpinner from '../../../components/CustomSpinner';
import SettingCard from '../../../features/settings/SettingCard';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {
  useSettingsQuery,
  useShippingPricesQuery,
} from '../../../services/settingService';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import {VStack} from 'native-base';
import SettingShippingFeeCard from '../../../features/settings/SettingShippingFeeCard';
import CustomButton from '../../../components/CustomButton';

const CustomerCreateOrderSettings = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {
    data: dataSettings,
    isLoading: isLoadingSettings,
    refetch: refetchSettings,
  } = useSettingsQuery({});
  const {
    data: dataShippingFee,
    isLoading: isLoadingShippingFee,
    refetch: refetchShippingFee,
  } = useShippingPricesQuery();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchSettings();
      refetchShippingFee();
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollViewLayout>
      <VStack space="4">
        <CustomSectionTitle text="Điều khoản đơn hàng" />
        <SettingCard {...dataSettings} />
        <CustomSectionTitle text="Phí vận chuyển" />
        {dataShippingFee?.length && (
          <SettingShippingFeeCard dataShippingFee={dataShippingFee} />
        )}
        <CustomButton onPress={() => navigation.navigate('CustomerLockers')}>
          Tiếp theo
        </CustomButton>
      </VStack>
      {(isLoadingShippingFee || isLoadingSettings) && (
        <CustomSpinner visible={isLoadingShippingFee || isLoadingSettings} />
      )}
    </ScrollViewLayout>
  );
};

export default CustomerCreateOrderSettings;
