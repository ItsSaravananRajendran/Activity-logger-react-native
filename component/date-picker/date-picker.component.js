import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {formatDate} from '../../utils/util.scripts';

function MyDatePicker(props) {
  return (
    <DatePicker
      mode="date"
      hideText={true}
      format="YYYY-MM-DD"
      minDate="2019-05-01"
      maxDate="2020-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      iconComponent={<Icon name="calendar-day" size={20} color="blue" />}
      onDateChange={props.onDateChange}
    />
  );
}

export default MyDatePicker;
