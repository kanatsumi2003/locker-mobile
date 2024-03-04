import {View, Text} from 'react-native';
import React from 'react';
import AppBar from './AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  label?: string;
  description?: string;
  center?: boolean;
  preventGoBack?: boolean;
}

const Layout: React.FC<Props> = ({
  label,
  description,
  children,
  center,
  preventGoBack,
}) => {
  return (
    <>
      <AppBar
        label={label}
        description={description}
        center={center}
        preventGoBack={preventGoBack}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          paddingHorizontal: 16,
        }}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default Layout;
