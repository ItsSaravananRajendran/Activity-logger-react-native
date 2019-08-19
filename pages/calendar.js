import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ToolBar from '../component/app-toolbar/toolbar-component';

class calendarScreen extends Component {
  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('itemId', 'WTF');
    return <View style={styles.main} />;
  }
}

const calendarActivity_StackNavigator = createStackNavigator({
  Profile: {
    screen: calendarScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Calendar',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {calendarActivity_StackNavigator};
export default calendarScreen;

const styles = StyleSheet.create({
  main: {flex: 1, flexDirection: 'row'},
});
