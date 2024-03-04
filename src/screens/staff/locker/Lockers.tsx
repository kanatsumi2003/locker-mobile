import React, {useState} from 'react';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {VStack} from 'native-base';
import FilterLocker from './FilterLocker';
import ListLocker from './ListLocker';
import {ILockerParams} from '../../../types/locker/locker';

const Lockers = () => {
  const [params, setParams] = useState<ILockerParams>({
    pageNumber: 1,
    pageSize: 5,
  });

  return (
    <Layout>
      <VStack space={4}>
        <FilterLocker setParams={setParams} />
        <ListLocker params={params} setParams={setParams} />
      </VStack>
    </Layout>
  );
};

export default Lockers;
