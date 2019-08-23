import React, {Component} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import ToolBar from '../component/app-toolbar/toolbar.component';
import SearchableDropDown from '../component/searchable-dropdown/searchable-dropdownbox.component';

import realm from '../data/activities-schema';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    let currentActivity = realm.objects('CurrentActivity');
    let temp = realm.objects('Activity');
    if (currentActivity.length === 0) {
      this.state = {
        currentActivity: '',
        duration: 0,
        data: temp.map(({goalTime, ...obj}) => obj),
      };
    } else {
      let dur = this.findDuration(currentActivity[0].startTime);
      this.state = {
        currentActivity: {...currentActivity[0]},
        duration: dur,
        data: temp.map(({goalTime, ...obj}) => obj),
      };
    }
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        let temp = realm.objects('Activity');
        this.setState({data: temp.map(({goalTime, ...obj}) => obj)});
      },
    );
    setInterval(() => {
      this.setState(state => {
        if (state.currentActivity !== '') {
          let dur = this.findDuration(state.currentActivity.startTime);
          return {duration: dur};
        } else {
          return {duration: 0};
        }
      });
    }, 60 * 1000);
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
    clearInterval();
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
      this.setState({currentActivity: {...activity}, duration: 0});
    }
  };

  extractName = obj => obj.name;

  render() {
    return (
      <View style={style.mainContainer}>
        <View style={style.frameContainer}>
          <View style={style.boldContainer}>
            <Text style={style.textStyleBold}> You are</Text>
          </View>
          <SearchableDropDown
            data={this.state.data}
            updateValue={this.onActivityChange}
            extractValue={this.extractName}>
            <View style={style.displayContainer}>
              <Text style={style.textStyle}>
                {this.state.currentActivity.name || 'Select an activity'}
              </Text>
            </View>
          </SearchableDropDown>
          <View style={style.boldContainer}>
            <Text style={style.textStyleBold}> For</Text>
          </View>
          <View style={style.clockContainer}>
            <Text style={style.clockStyle}>
              {Math.floor(this.state.duration / 60)} HH :
              {Math.floor(this.state.duration % 60)} MM
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
    fontSize: 20,
    textAlign: 'left',
  },
  textStyleBold: {
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
  displayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: -1,
    padding: 12,
    backgroundColor: '#d0dcf2',
    borderRadius: 20,
  },
});
