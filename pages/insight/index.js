import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import ToolBar from '../../component/app-toolbar/toolbar.component';

import ActivityPieScreen from './activity-pie';
import GoalScreen from './goals';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let iconName;
  if (routeName === 'ActivityScreen') {
    iconName = 'chart-pie';
  } else if (routeName === 'Goal') {
    iconName = 'chart-bar';
  }
  return <Icon name={iconName} size={25} color={tintColor} />;
};

const insight_TabNavigator = createBottomTabNavigator(
  {
    ActivityScreen: {screen: ActivityPieScreen},
    Goal: {screen: GoalScreen},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        return getTabBarIcon(navigation, focused, tintColor);
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  },
);

const insightActivity_StackNavigator = createStackNavigator({
  Insight: {
    screen: insight_TabNavigator,
    navigationOptions: ({navigation}) => ({
      title: 'Insights',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {insightActivity_StackNavigator};
