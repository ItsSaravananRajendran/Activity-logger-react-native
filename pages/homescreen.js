import React, {Component} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ToolBar from '../component/app-toolbar/toolbar-component';
import SearchableDropDown from '../component/searchable-dropdown/searchable-dropdownbox.component';

import realm from '../data/activities-schema';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    let currentActivity = realm.objects('CurrentActivity');
    let temp = realm.objects('Activity');
    this.data = temp.map(({goalTime, ...obj}) => obj);
    if (currentActivity.length === 0) {
      this.state = {
        currentActivity: '',
        hours: 0,
        minutes: 0,
      };
    } else {
      let dur = this.findDuration(currentActivity[0].startTime);
      let hr = Math.floor(dur / 60);
      let min = Math.floor(dur % 60);
      this.state = {
        currentActivity: {...currentActivity[0]},
        hours: hr,
        minutes: min,
      };
    }
  }

  findDuration = start => Math.floor((new Date() - start) / 60000);

  onActivityChange = activity => {
    if (activity.name !== this.state.currentActivity.name) {
      if (this.state.currentActivity !== '') {
        let completedActivity = this.state.currentActivity;
        completedActivity.endTime = new Date();
        completedActivity.duration = this.findDuration(
          completedActivity.startTime,
        );
        realm.write(() => {
          realm.create('ActivityLog', completedActivity);
        });
      }
      activity.startTime = new Date();
      if (this.state.currentActivity === '') {
        realm.write(() => {
          realm.create('CurrentActivity', activity);
        });
        ToastAndroid.showWithGravity(
          'Activity has been added successfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      } else {
        realm.write(() => {
          let curr = realm.objects('CurrentActivity');
          curr.update('startTime', activity.startTime);
          curr.update('name', activity.name);
          curr.update('type', activity.type);
        });
      }
      this.setState({currentActivity: {...activity}, hours: 0, minutes: 0});
    }
  };

  extractName = obj => obj.name;

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={style.frameContainer}>
          <View style={style.boldContainer}>
            <Text style={style.textStyle}> You are</Text>
          </View>
          <SearchableDropDown
            data={this.data}
            updateValue={this.onActivityChange}
            value={this.state.currentActivity.name}
            extractValue={this.extractName}
          />
          <View style={style.boldContainer}>
            <Text style={style.textStyle}> For</Text>
          </View>
          <View style={style.clockContainer}>
            <Text style={style.clockStyle}>
              {this.state.hours} HH : {this.state.minutes} MM
            </Text>
          </View>
        </View>
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
  },
  frameContainer: {
    flex: -1,
    margin: 40,
    alignItems: 'center',
    width: 300,
    backgroundColor: '#aaaaaa',
  },
  boldContainer: {
    flex: -1,
    margin: 40,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 45,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  clockContainer: {
    margin: 20,
  },
  clockStyle: {
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
