import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ToolBar from '../component/app-toolbar/toolbar-component';

class ProfileScreen extends Component {
  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('itemId', 'WTF');
    return <View style={styles.main} />;
  }
}

const profileActivity_StackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Profile',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {profileActivity_StackNavigator};
export default ProfileScreen;

const styles = StyleSheet.create({
  main: {flex: 1, flexDirection: 'row'},
});
