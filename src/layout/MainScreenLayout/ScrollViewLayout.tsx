import React from 'react';
import {IScrollViewProps, ScrollView, View} from 'native-base';
import ModalProvider from '../../features/modal/ModalProvider';

interface Props extends IScrollViewProps {
  children: React.ReactNode;
}

const ScrollViewLayout: React.FC<Props> = ({children, ...props}) => {
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 100}}
      bg="white"
      paddingX={4}
      paddingTop={4}
      paddingBottom={4}
      flex="1"
      showsVerticalScrollIndicator={false}
      {...props}>
      <ModalProvider />
      {children}
    </ScrollView>
  );
};

export default ScrollViewLayout;
