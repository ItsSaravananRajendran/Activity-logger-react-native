import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HeaderView = props => {
  return (
    <View style={style.mainContainer}>
      <Text style={style.textStyle}>{props.title}</Text>
    </View>
  );
};

export default HeaderView;

const style = StyleSheet.create({
  mainContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
  },
});
