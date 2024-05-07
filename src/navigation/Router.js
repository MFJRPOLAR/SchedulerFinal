import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import AddContact from '../screens/AddContact';
import AddGroupScreen from '../screens/AddGroup';
import ExistingContactScreen from '../screens/ExistingContact';
import ExistingGroupScreen from '../screens/ExistingGroup';
import AddContactToGroupScreen from '../screens/AddContactToGroup';
import ViewContactsInGroupScreen from '../screens/ViewContactsInGroup';
import SignUpScreen from '../screens/SignUp';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Go To Contacts!'} component={TabNavigator}/>
        <Stack.Screen name={'Add Contact'} component={AddContact}/>
        <Stack.Screen name={'Add Group'} component={AddGroupScreen}/>
        <Stack.Screen name={'Existing Contact'} component={ExistingContactScreen}/>
        <Stack.Screen name={'Existing Group'} component={ExistingGroupScreen}/>
        <Stack.Screen name={'Add Contact To Group'} component={AddContactToGroupScreen}/>
        <Stack.Screen name={'View Contacts In Group'} component={ViewContactsInGroupScreen}/>
        <Stack.Screen name={'Sign Up'} component={SignUpScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;