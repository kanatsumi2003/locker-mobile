import {View} from 'native-base';
import React from 'react';
import ModalProvider from '../../features/modal/ModalProvider';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <View bg="white" p={4} flex="1">
      <ModalProvider />
      {children}
    </View>
  );
};

export default Layout;
