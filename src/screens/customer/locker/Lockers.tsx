import {Text, VStack} from 'native-base';
import React, {useState} from 'react';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {ILockerParams, LOCKER_STATUS} from '../../../types/locker/locker';
import FilterLocker from './FilterLocker';
import ListLocker from './ListLocker';

const Lockers = () => {
  const [params, setParams] = useState<ILockerParams>({
    pageNumber: 1,
    pageSize: 5,
    status: LOCKER_STATUS.ACTIVE,
  });

  return (
    <Layout>
      <VStack space={3}>
        <FilterLocker setParams={setParams} />
        <Text fontSize="md" fontStyle="italic">
          Chọn Locker để đặt chỗ
        </Text>
        <ListLocker params={params} setParams={setParams} />
      </VStack>
    </Layout>
  );
};

export default Lockers;
