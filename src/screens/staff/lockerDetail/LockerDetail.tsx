import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {HStack, Icon, Stack, Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {RefreshControl} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Empty from '../../../components/Empty';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useBoxesQuery} from '../../../services/boxService';
import {useLockerQuery} from '../../../services/lockerService';
import BoxSection from './BoxSection';
import LockerDetailSection from './LockerDetailSection';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Layout from '../../../layout/MainScreenLayout/Layout';

const LockerDetail = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'StaffLockerDetail'>>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeStackParamList, 'StaffBoxEmergencyOpen'>
    >();

  const {data, isFetching, isLoading, refetch} = useLockerQuery(
    {id: Number(route.params!.id)},
    {skip: !route.params?.id},
  );

  const {
    data: dataBoxes,
    isFetching: isFetchingBoxes,
    refetch: refetchBoxes,
  } = useBoxesQuery(
    {
      id: Number(route.params!.id),
    },
    {
      skip: !route.params?.id,
    },
  );

  const onRefresh = () => {
    refetch();
    refetchBoxes();
  };

  const handleBoxEmergencyOpen = () => {
    navigation.navigate('StaffBoxEmergencyOpenQRScan', {
      id: Number(route.params!.id),
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
      refetchBoxes();
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
    <View bg="white" flex={1}>
      <ScrollViewLayout
        refreshControl={
          <RefreshControl
            refreshing={isFetching || isFetchingBoxes}
            onRefresh={onRefresh}
          />
        }>
        <Stack space={4}>
          <LockerDetailSection
            {...data}
            isFetching={isFetching}
            isLoading={isLoading}
          />
          {dataBoxes?.length ? (
            <BoxSection data={dataBoxes} />
          ) : (
            <Empty text="Không có ô tủ nào" />
          )}
        </Stack>
      </ScrollViewLayout>
      <CustomButton
        onPress={handleBoxEmergencyOpen}
        colorScheme="red"
        position="sticky"
        bottom={4}
        mx={4}
        shadow={2}>
        <HStack alignItems="center" space="2">
          <Icon as={<Feather name="unlock" />} color="white" />
          <Text color="white">Mở tủ khẩn cấp</Text>
        </HStack>
      </CustomButton>
    </View>
  );
};

export default LockerDetail;
