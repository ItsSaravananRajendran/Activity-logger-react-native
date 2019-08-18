import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {homeActivity_StackNavigator} from './Activity/homescreen';
import {profileActivity_StackNavigator} from './Activity/profile';

const drawerNavigator = createDrawerNavigator(
  {
    HomeDrawer: {
      screen: homeActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Activity',
        drawerIcon: ({tintColor}) => (
          <Icon name="running" size={24} color={tintColor} />
        ),
      },
    },
    CalenderDrawer: {
      screen: profileActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Calendar',
        drawerIcon: ({tintColor}) => (
          <Icon name="calendar-check" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: 'green',
    },
  },
);

const App = createAppContainer(drawerNavigator);

export default App;
