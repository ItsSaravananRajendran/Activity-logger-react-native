import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';

function MyDatePicker(props) {
  return (
    <DatePicker
      mode="date"
      date={props.date ? props.date : ''}
      hideText={props.hideText}
      format="YYYY-MM-DD"
      minDate="2019-05-01"
      placeholder={props.placeholder ? props.placeholder : 'select date'}
      maxDate="2020-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={props.onDateChange}
    />
  );
}

export default MyDatePicker;
