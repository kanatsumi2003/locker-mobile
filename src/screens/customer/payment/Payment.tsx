import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import PaymentItem from '../../../features/payment/PaymentItem';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {usePaymentsQuery} from '../../../services/paymentService';
import {IPaymentItem, IPaymentParams} from '../../../types/bill/bill';

const Payment = () => {
  const [payments, setPayments] = useState<IPaymentItem[]>([]);

  const [params, setParams] = useState<IPaymentParams>({
    pageNumber: 1,
    pageSize: 10,
  });

  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, 'CustomerPayments'>
    >();

  const {data, refetch, isFetching} = usePaymentsQuery(params);

  const handleLoadMore = useCallback(() => {
    data?.totalPages &&
      params?.pageNumber &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber ? prev.pageNumber + 1 : 0,
      }));
  }, [data, params]);

  useEffect(() => {
    if (data?.items) {
      if (params.pageNumber === 1) {
        setPayments([...data?.items]);
      } else {
        data?.items && setPayments(prev => [...prev, ...data?.items]);
      }
    } else {
      setPayments([]);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    refetch();
    setParams({
      ...params,
      pageNumber: 1,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, []);

  return (
    <Layout>
      {data?.items.length ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 80,
          }}
          showsVerticalScrollIndicator={false}
          bg="white"
          data={payments}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <PaymentItem {...item} />}
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
      ) : (
        <Empty text="Không có giao dịch nào" />
      )}
    </Layout>
  );
};

export default Payment;
