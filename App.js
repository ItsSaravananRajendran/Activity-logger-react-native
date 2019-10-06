import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {homeActivity_StackNavigator} from './pages/homescreen';
import {calendarActivity_StackNavigator} from './pages/calendar';
import {addActivity_StackNavigator} from './pages/add-activity';
import {insightActivity_StackNavigator} from './pages/insight';
import {editLog_StackNavigator} from './pages/editLog/editLog';
import customNavigationDrawer from './component/nav-drawer/nav-drawer-component';

const drawerNavigator = createDrawerNavigator(
  {
    HomeActivity: {
      screen: homeActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Activity',
        drawerIcon: ({tintColor}) => (
          <Icon name="running" size={22} color={tintColor} />
        ),
      },
    },
    AddActivity: {
      screen: addActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Add Activity',
        drawerIcon: ({tintColor}) => (
          <Icon name="plus" size={22} color={tintColor} />
        ),
      },
    },
    CalenderActivity: {
      screen: calendarActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Calendar',
        drawerIcon: ({tintColor}) => (
          <Icon name="calendar-check" size={22} color={tintColor} />
        ),
      },
    },

    insightActivity: {
      screen: insightActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Insights',
        drawerIcon: ({tintColor}) => (
          <Icon name="chart-line" size={22} color={tintColor} />
        ),
      },
    },

    editLogActivity: {
      screen: editLog_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Edit logs',
        drawerIcon: ({tintColor}) => (
          <Icon name="edit" size={22} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: customNavigationDrawer,
    contentOptions: {
      activeTintColor: 'green',
    },
  },
);

const App = createAppContainer(drawerNavigator);

export default App;
