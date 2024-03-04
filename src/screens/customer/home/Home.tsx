import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Stack} from 'native-base';
import React, {useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useDispatch} from 'react-redux';
import BalanceCard from '../../../features/wallet/BalanceCard';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useLazyCustomerProfileQuery} from '../../../services/authService';
import {setUserInfo} from '../../../stores/global.store';
import LockerSection from './LockerSection';
import OrderSection from './OrderSection';
import ServiceSection from './ServiceSection';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch();

  // LAZY QUERY PROFILE
  const [
    triggerProfile,
    {
      isLoading: isLoadingProfile,
      isFetching: isFetchingProfile,
      data: dataProfile,
    },
  ] = useLazyCustomerProfileQuery();

  const handleRefresh = () => {
    triggerProfile(undefined);
  };

  useEffect(() => {
    dataProfile && dispatch(setUserInfo(dataProfile));
  }, [dataProfile]);

  return (
    <>
      <ScrollViewLayout
        refreshControl={
          <RefreshControl
            refreshing={isFetchingProfile && !isLoadingProfile}
            onRefresh={handleRefresh}
          />
        }>
        <Stack space={4}>
          <BalanceCard
            handlePress={() => navigation.navigate('CustomerWallet')}
          />
          <ServiceSection />
          <LockerSection />
          <OrderSection />
        </Stack>
      </ScrollViewLayout>
    </>
  );
};

export default Home;
