import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {
          // <StatusBar hidden={true}/>
        }
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App;