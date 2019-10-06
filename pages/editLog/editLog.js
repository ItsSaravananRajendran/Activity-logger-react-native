import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';

import ToolBar from '../../component/app-toolbar/toolbar.component';
import MyDatePicker from '../../component/date-picker/date-picker.component';
import {getLogActivities, updateTime, updateName} from './data.util';

class EditLogScreen extends Component {
  constructor(props) {
    super(props);
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    this.state = {
      startTime: startTime,
    };
  }

  dateChange = stringDate => {
    const startTime = new Date(stringDate);
    startTime.setHours(0, 0, 0, 0);
    this.setState({startTime});
  };

  render() {
    const {
      state: {startTime},
      dateChange,
    } = this;
    const activityLog = getLogActivities(startTime);
    return (
      <View style={style.pageContainer}>
        <View style={style.calenderContainer}>
          <MyDatePicker
            date={startTime}
            onDateChange={dateChange}
            hideText={false}
          />
        </View>
        <View style={style.scrollViewContainer}>
          <FlatList
            data={activityLog}
            renderItem={({item}) => (
              <CustomRow
                name={item.name}
                startTime={item.startTime}
                endTime={item.endTime}
                type={item.type}
                id={item.id}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const CustomRow = props => {
  const {name, startTime, endTime, id, type} = props;
  return (
    <View style={style.mainContainer}>
      <View style={style.typeContainer}>
        <Text style={style.typeTextStyle}>{type}</Text>
      </View>
      <View style={style.nameContainer}>
        <Text style={style.textStyle}>{name}</Text>
      </View>
      <View style={style.fromContainer}>
        <DatePicker
          mode="time"
          date={startTime ? startTime : ''}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          style={style.datePickerStyle}
          is24Hour={true}
        />
      </View>
      <View style={style.iconContainer}>
        <Icon name="long-arrow-alt-right" size={20} color="blue" />
      </View>
      <View style={style.toContainer}>
        <DatePicker
          mode="time"
          date={endTime ? endTime : ''}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={time => updateTime(id, getAdjustedTime(time, endTime))}
          showIcon={false}
          style={style.datePickerStyle}
          is24Hour={true}
        />
      </View>
    </View>
  );
};
1;

const getAdjustedTime = (timeString, timeStamp) => {
  const time = timeString.split(':');
  const hour = parseInt(time[0]);
  const min = parseInt(time[1]);
  timeStamp.setHours(hour, min);
  return timeStamp;
};

const editLog_StackNavigator = createStackNavigator({
  EditLog: {
    screen: EditLogScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Log',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {editLog_StackNavigator};
export default EditLogScreen;

const style = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  calenderContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
  scrollViewContainer: {
    flex: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a7b2c4',
    height: 50,
    marginBottom: 5,
  },
  datePickerStyle: {
    width: 70,
  },
  nameContainer: {
    margin: 5,
    width: 110,
  },
  textStyle: {
    fontSize: 18,
  },
  typeContainer: {
    margin: 5,
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#b9ebb5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeTextStyle: {
    fontSize: 20,
  },
  fromContainer: {},
  toContainer: {},
  iconContainer: {},
});
