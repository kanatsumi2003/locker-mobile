import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, VStack, View} from 'native-base';
import React, {useEffect} from 'react';
import Empty from '../../../components/Empty';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useOrderQuery} from '../../../services/orderService';
import ServiceDetailItem from './ServiceDetailItem';
import ServiceSection from './ServiceSection';

const ServiceDetail = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffServiceDetail'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // QUERY
  const {data, isFetching, isLoading, refetch} = useOrderQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id},
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  const detailItems = data?.details?.find(
    item => item.id === route.params.detailId,
  )?.items;

  return (
    <Layout>
      <VStack space="4">
        <FlatList
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          minH="full"
          data={detailItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View mb={4}>
              <ServiceDetailItem {...item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ServiceSection />}
          {...(detailItems?.length === 0 && {
            ListFooterComponent: <Empty text="Không có đồ cần giặt" />,
          })}
        />
      </VStack>
    </Layout>
  );
};

export default ServiceDetail;
