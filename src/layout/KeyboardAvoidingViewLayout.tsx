import {View, Text, Platform} from 'react-native';
import React from 'react';
import {KeyboardAvoidingView} from 'native-base';

interface Props {
  children: React.ReactNode;
  iosOffset?: number;
  androidOffset?: number;
}

const KeyboardAvoidingViewLayout: React.FC<Props> = ({
  children,
  iosOffset = -64,
  androidOffset = 0,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? iosOffset : androidOffset}
      style={{flex: 1}}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingViewLayout;
