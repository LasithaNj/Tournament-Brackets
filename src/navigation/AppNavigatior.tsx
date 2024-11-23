import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { BracketScreen } from '../screens/bracketView/BracketScreen'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()



export function AppNavigatior(){

    return(
        <Stack.Navigator>
            <Stack.Screen name="Brackets" component={BracketScreen}/>
        </Stack.Navigator>

    )
}