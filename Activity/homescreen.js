import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import ToolBar from '../component/app-toolbar/toolbar-component';

class HomeScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={style.mainContainer}>
        <Button
          title="Go to  Profile"
          onPress={() => navigate('Profile', {itemId: 86})}
        />
      </View>
    );
  }
}

const homeActivity_StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Welcome',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {homeActivity_StackNavigator};
export default HomeScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 140,
  },
});
