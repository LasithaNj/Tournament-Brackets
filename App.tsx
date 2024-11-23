/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AppNavigatior } from './src/navigation/AppNavigatior';
import { NavigationContainer } from '@react-navigation/native';





function App(): React.JSX.Element {

  return (
    <NavigationContainer>
        <AppNavigatior/>
    </NavigationContainer>
  );
}


export default App;
