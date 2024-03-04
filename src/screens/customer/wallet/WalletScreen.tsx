import React from 'react';
import BalanceCard from '../../../features/wallet/BalanceCard';
import PaymentMethod from '../../../features/wallet/PaymentMethod';
import ScrollViewLayout from '../../../layout/MainScreenLayout/ScrollViewLayout';

const WalletScreen = () => {
  return (
    <ScrollViewLayout>
      <BalanceCard />
      <PaymentMethod />
    </ScrollViewLayout>
  );
};

export default WalletScreen;
