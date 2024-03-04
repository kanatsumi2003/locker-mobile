/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {KeyboardAvoidingView, NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {LogBox, Platform} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import Navigation from './src/navigation';
import store from './src/stores';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    SplashScreen?.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -72 : 0}
              style={{flex: 1}}>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
