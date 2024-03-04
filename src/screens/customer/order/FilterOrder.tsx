import {HStack, Icon} from 'native-base';
import React from 'react';
import SearchBar from '../../../components/SearchBar';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomIconButton from '../../../components/CustomIconButton';
import {DrawerParamList} from '../../../navigation/customer/TabNavigationCustomer';
import {IOrderParams} from '../../../types/order/order';
import {useSelector} from 'react-redux';
import {selectOrderParams} from '../../../stores/order.store';

interface Props {
  setParams: React.Dispatch<React.SetStateAction<IOrderParams>>;
}

const FilterOrder: React.FC<Props> = ({setParams}) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const orderParams = useSelector(selectOrderParams);

  const isFiltered =
    orderParams?.type ||
    orderParams?.search ||
    orderParams?.status ||
    orderParams?.from ||
    orderParams?.to ||
    orderParams?.lockerId;

  return (
    <HStack w="full" space={2}>
      <SearchBar<IOrderParams>
        query="search"
        placeholder="Tìm kiếm đơn hàng"
        setParams={setParams}
      />

      <CustomIconButton
        colorScheme={isFiltered ? 'blue' : 'gray'}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        icon={<Icon as={<MaterialCommunityIcons name="filter-variant" />} />}
      />
    </HStack>
  );
};

export default FilterOrder;
