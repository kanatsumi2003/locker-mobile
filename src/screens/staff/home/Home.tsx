import {Stack} from 'native-base';
import React from 'react';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';
import LockerSection from './LockerSection';
import OrderSection from './OrderSection';
import StoreSection from './StoreSection';

const HomeScreen = () => {
  return (
    <ScrollViewLayout>
      <Stack space={4}>
        <StoreSection />
        <LockerSection />
        <OrderSection />
      </Stack>
    </ScrollViewLayout>
  );
};

export default HomeScreen;
