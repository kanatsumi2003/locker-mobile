import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, Skeleton, View} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import CustomSpinner from '../../../components/CustomSpinner';
import Empty from '../../../components/Empty';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {useLockersQuery} from '../../../services/lockerService';
import {selectLockerParams} from '../../../stores/order.store';
import {ILockerItem, ILockerParams} from '../../../types/locker/locker';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';
import LockerItem from '../../../features/locker/LockerItem';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';

interface Props {
  params: ILockerParams;
  setParams: React.Dispatch<React.SetStateAction<ILockerParams>>;
}

const ListLocker: React.FC<Props> = ({params, setParams}) => {
  const [lockers, setLockers] = useState<ILockerItem[]>([]);
  const lockerParams = useSelector(selectLockerParams);

  const {data, isLoading, isFetching, refetch} = useLockersQuery(params);

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleLoadMore = useCallback(() => {
    !isFetching &&
      data?.totalPages &&
      params?.pageNumber < data.totalPages &&
      setParams(prev => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
  }, [data, params]);

  useEffect(() => {
    if (data?.items) {
      if (params.pageNumber === 1) {
        setLockers([...data?.items]);
      } else {
        data?.items && setLockers([...lockers, ...data?.items]);
      }
    } else {
      setLockers([]);
    }
  }, [data]);

  useEffect(() => {
    setParams({...params, ...lockerParams});
  }, [lockerParams]);

  const onRefresh = () => {
    refetch();
    setParams({...params, pageNumber: 1});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return [...new Array(5)]?.map(_ => <CustomSkeletonCard />);
  }

  return (
    <>
      {lockers.length ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 280,
          }}
          minH="full"
          data={lockers}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View mb={4}>
              <LockerItem
                {...item}
                handlePress={() =>
                  navigation.navigate('CustomerLockerDetail', {id: item?.id})
                }
              />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            <>
              {!data && <CustomSpinner visible={!data} />}
              {isFetching && <CustomActivityIndicator />}
            </>
          }
        />
      ) : (
        <Empty text="Không có lockers" />
      )}
    </>
  );
};

export default ListLocker;
