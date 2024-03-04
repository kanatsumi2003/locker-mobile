import {VStack} from 'native-base';
import React, {useState} from 'react';
import Layout from '../../../layout/MainScreenLayout/Layout';
import {IOrderParams} from '../../../types/order/order';
import FilterOrder from './FilterOrder';
import ListOrder from './ListOrder';

const Orders = () => {
  const [params, setParams] = useState<IOrderParams>({
    pageNumber: 1,
    pageSize: 5,
    // staffId: userInfo?.id,
    // status: ORDER_STATUS.PROCESSING,
    // storeId: userInfo?.store?.id,
    // lockerId: userInfo?.st,
  });

  return (
    <Layout>
      <VStack space={4}>
        <FilterOrder setParams={setParams} />
        <ListOrder params={params} setParams={setParams} />
      </VStack>
    </Layout>
  );
};

export default Orders;
