import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import NotificationItemUser from '../../../features/notification/NotificationItemUser';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useNotificationsQuery} from '../../../services/notificationService';
import {
  INotificationItem,
  INotificationParams,
} from '../../../types/notification/notification';

const Notification = () => {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);

  const [params, setParams] = useState<INotificationParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data, refetch, isFetching} = useNotificationsQuery(params);

  const handleLoadMore = useCallback(() => {
    !isFetching &&
      data?.totalPages &&
      params?.pageNumber &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber ? prev.pageNumber + 1 : 1,
      }));
  }, [data, params]);

  useEffect(() => {
    if (data?.items) {
      if (params.pageNumber === 1) {
        setNotifications(data?.items ? [...data?.items] : []);
      } else {
        data?.items && setNotifications([...notifications, ...data?.items]);
      }
    } else {
      setNotifications([]);
    }
  }, [data]);

  const onRefresh = () => {
    refetch();
    setParams({
      ...params,
      pageNumber: 1,
      pageSize: 10,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, []);

  if (notifications.length === 0) {
    return (
      <Layout>
        <Empty text="Không có thông báo" />
      </Layout>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 80}}
      showsVerticalScrollIndicator={false}
      bg="white"
      data={notifications}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <NotificationItemUser {...item} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        <>
          {<CustomSpinner visible={!data} />}
          {isFetching && <CustomActivityIndicator />}
        </>
      }
    />
  );
};

export default Notification;
