import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  Flex,
  FormControl,
  HStack,
  Icon,
  Radio,
  Text,
  View,
  useToast,
  VStack,
  Center,
} from 'native-base';
import React, {useEffect} from 'react';
import Empty from '../../../components/Empty';
import CustomSkeletonBox from '../../../components/skeleton/CustomSkeletonBox';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import {HomeStackParamList} from '../../../navigation/staff/TabNavigationStaff';
import {useBoxesQuery, useOpenBoxMutation} from '../../../services/boxService';
import CustomButton from '../../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import {BoxType, IBoxItem, IEmergencyOpenBoxBody} from '../../../types/box/box';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomRadio from '../../../components/CustomRadio';
import BoxItem from '../../../features/box/BoxItem';
import CustomToast from '../../../components/CustomToast';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const BoxEmergencyOpen = () => {
  const route =
    useRoute<RouteProp<HomeStackParamList, 'StaffBoxEmergencyOpen'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {
    data: dataBoxes,
    isLoading: isLoadingBoxes,
    refetch,
  } = useBoxesQuery(
    {
      id: Number(route.params!.id),
    },
    {
      skip: !route.params?.id,
    },
  );

  const boxStatusMapper = (box: IBoxItem): BoxType => {
    if (box.isActive) {
      if (box.isAvailable) {
        return 'available';
      }

      return 'unavailable';
    }

    return 'locked';
  };

  // FORM CONTROL
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IEmergencyOpenBoxBody>();

  // HOOKS
  const toast = useToast();

  // MUTATION
  const [openBox, {isSuccess, isError, error}] = useOpenBoxMutation();

  const onSubmit: SubmitHandler<IEmergencyOpenBoxBody> = data => {
    openBox({
      ...data,
      id: Number(route.params!.id),
      token: String(route.params!.token),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.show({
        placement: 'top-left',
        duration: 1500,
        render: () => (
          <CustomToast
            title="Thành công!"
            description="Mở tủ thành công"
            status="success"
          />
        ),
      });
      navigation.navigate('StaffLockerDetail', {id: Number(route.params!.id)});
    }

    if (isError) {
      toast.show({
        placement: 'top-left',
        render: () => (
          <CustomToast
            title="Thất bại!"
            description={error?.message || 'Mở tủ thất bại!'}
            status="error"
          />
        ),
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  if (isLoadingBoxes) {
    return (
      <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-between">
        {[...new Array(4)]?.map(_ => (
          <CustomSkeletonBox />
        ))}
      </Flex>
    );
  }

  return (
    <View flex={1} bg="white">
      <ScrollViewLayout>
        {dataBoxes?.length ? (
          <FormControl isInvalid={'boxNumber' in errors}>
            <CustomRadio control={control} name="boxNumber">
              <Flex
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="space-between">
                {dataBoxes?.map(box => (
                  <VStack mb="4" key={box.id}>
                    <BoxItem
                      type={boxStatusMapper(box)}
                      number={box.number}
                      description={box.description}
                      isAvailable={box.isAvailable}
                      lastOrder={box.lastOrder}
                    />
                    <Center>
                      <Radio
                        aria-label={String(box?.id)}
                        value={String(box?.number)}
                      />
                    </Center>
                  </VStack>
                ))}
              </Flex>
            </CustomRadio>
          </FormControl>
        ) : (
          <Empty text="Không có ô tủ nào" />
        )}
      </ScrollViewLayout>

      <CustomButton
        shadow={2}
        onPress={handleSubmit(onSubmit)}
        position="sticky"
        bottom={4}
        mx={4}>
        <HStack alignItems="center" space="2">
          <Icon as={<Feather name="unlock" />} color="white" />
          <Text color="white">Mở tủ</Text>
        </HStack>
      </CustomButton>
    </View>
  );
};

export default BoxEmergencyOpen;
