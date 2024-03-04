import {HStack} from 'native-base';
import React from 'react';
import SearchBar from '../../../components/SearchBar';

import {DrawerActions, useNavigation} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomIconButton from '../../../components/CustomIconButton';
import {DrawerParamList} from '../../../navigation/staff/TabNavigationStaff';
import {ILockerParams} from '../../../types/locker/locker';
import {useSelector} from 'react-redux';
import {selectLockerParams} from '../../../stores/order.store';

interface Props {
  setParams: React.Dispatch<React.SetStateAction<ILockerParams>>;
}

const FilterLocker: React.FC<Props> = ({setParams}) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const lockerParams = useSelector(selectLockerParams);

  const isFiltered =
    lockerParams?.search ||
    lockerParams?.status ||
    lockerParams?.provinceCode ||
    lockerParams?.districtCode ||
    lockerParams?.wardCode;

  return (
    <HStack w="full" space={2}>
      <SearchBar<ILockerParams>
        query="search"
        placeholder="Tìm kiếm lockers"
        setParams={setParams}
      />

      <CustomIconButton
        colorScheme={isFiltered ? 'blue' : 'gray'}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
        icon={<MaterialCommunityIcons name="filter-variant" />}
      />
    </HStack>
  );
};

export default FilterLocker;
