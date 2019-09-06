import React, {component} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MyDatePicker from '../date-picker/date-picker.component';

const FromToDateBar = function(props) {
  return (
    <View style={style.mainContainer}>
      <MyDatePicker
        date={props.startDate}
        onDateChange={props.onStartDateChange}
        hideText={false}
      />
      <Icon name="arrow-right" size={24} />
      <MyDatePicker
        date={props.endDate}
        onDateChange={props.onEndDateChange}
        hideText={false}
      />
    </View>
  );
};

export default FromToDateBar;

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 30,
    marginBottom: 25,
  },
});
