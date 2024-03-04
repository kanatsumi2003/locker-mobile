import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Stack} from 'native-base';
import React, {useEffect} from 'react';
import {RefreshControl} from 'react-native';
import Empty from '../../../components/Empty';
import Layout from '../../../layout/MainScreenLayout/Layout';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useLockerQuery} from '../../../services/lockerService';
import LockerDetailSection from './LockerDetailSection';

const LockerDetail = () => {
  const route = useRoute<RouteProp<HomeStackParamList>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {data, isFetching, refetch, isLoading} = useLockerQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id},
  );

  const onRefresh = () => {
    refetch();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (!data) {
    return (
      <Layout>
        <Empty text="Không tìm thấy locker" />
      </Layout>
    );
  }

  return (
    <ScrollViewLayout
      w="full"
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }>
      <Stack space={4}>
        <LockerDetailSection
          {...data}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      </Stack>
    </ScrollViewLayout>
  );
};

export default LockerDetail;
