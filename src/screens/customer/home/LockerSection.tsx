import React, {useEffect} from 'react';
import {VStack, Text, HStack, Skeleton, ScrollView} from 'native-base';
import LockerCard from '../../../features/locker/LockerCard';
import {useLockersQuery} from '../../../services/lockerService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import Empty from '../../../components/Empty';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';
import {LOCKER_STATUS} from '../../../types/locker/locker';

const LockerSection = () => {
  const {data, isFetching, isLoading, refetch} = useLockersQuery({
    pageNumber: 1,
    pageSize: 5,
    status: LOCKER_STATUS.ACTIVE,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (isLoading || isFetching) return <CustomSkeletonCard />;

  return (
    <VStack space={4}>
      <HStack alignItems="center" justifyContent="space-between">
        <CustomSectionTitle text={`Lockers (${data?.totalCount})`} />

        <Text
          color="gray.500"
          onPress={() => navigation.navigate('CustomerLockers')}>
          Xem tất cả
        </Text>
      </HStack>

      {data?.items && data?.items?.length === 0 ? (
        <Empty />
      ) : data?.items && data?.items?.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={true}
          bounces={true}
          decelerationRate="fast"
          pagingEnabled>
          <HStack space={3} w={'full'}>
            {data?.items?.map(locker => (
              <LockerCard
                key={locker?.id}
                maxW={80}
                {...locker}
                handlePress={() =>
                  navigation.navigate('CustomerLockerDetail', {
                    id: locker?.id,
                  })
                }
              />
            ))}
          </HStack>
        </ScrollView>
      ) : (
        <LockerCard
          key={data?.items?.[0]?.id}
          {...data?.items?.[0]}
          handlePress={() =>
            navigation.navigate('CustomerLockerDetail', {
              id: data?.items?.[0]?.id,
            })
          }
        />
      )}
    </VStack>
  );
};

export default LockerSection;
