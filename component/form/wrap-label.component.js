import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const WrapLabel = props => {
  return (
    <View style={style.mainContainer}>
      <Text style={style.textStyle}> {props.label} </Text>
      <View style={style.childView}>{props.children}</View>
    </View>
  );
};

export default WrapLabel;

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  textStyle: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
  },
  childView: {
    marginTop: 10,
  },
});
