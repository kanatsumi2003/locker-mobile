import React, {useEffect} from 'react';
import {HStack, ScrollView, VStack} from 'native-base';
import CustomSectionTitle from '../../../components/CustomSectionTitle';
import {SERVICE_STATUS} from '../../../types/service/service';
import {useServicesQuery} from '../../../services/serviceService';
import GlobalServiceCard from '../../../features/service/GlobalServiceCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../../../navigation/customer/TabNavigationCustomer';
import CustomSkeletonCard from '../../../components/skeleton/CustomSkeletonCard';

const ServiceSection = () => {
  const {data, isLoading, refetch} = useServicesQuery({
    pageNumber: 1,
    pageSize: 10,
    status: SERVICE_STATUS.ACTIVE,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (isLoading) return <CustomSkeletonCard />;

  return (
    <VStack space={4}>
      <CustomSectionTitle text={`Dịch vụ (${data?.totalCount})`} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        bounces={true}
        decelerationRate="fast"
        pagingEnabled>
        <HStack space={3} w={'full'}>
          {data?.items?.map(service => (
            <GlobalServiceCard key={service?.id} maxW={80} {...service} />
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};

export default ServiceSection;
