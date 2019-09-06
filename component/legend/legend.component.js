import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Cell = function(props) {
  const {label, value, color} = props;
  return (
    <View style={style.cellContainer}>
      <View style={[style.square, {backgroundColor: color}]} />
      <Text style={style.textStyle}>
        {`${label} ${value ? '- ' + value : ''}`}
      </Text>
    </View>
  );
};

const Row = function(props) {
  const {rowData} = props;
  return (
    <View style={style.row}>
      {rowData.map(data => (
        <Cell
          key={data.key}
          label={data.label}
          value={data.value}
          color={data.svg.fill}
        />
      ))}
    </View>
  );
};

const Legend = function(props) {
  let rowData = [];
  const {data, cols} = props;
  for (let I = 0; I < data.length; I++) {
    let start = I * cols;
    rowData.push(data.slice(start, start + cols));
  }
  return (
    <View style={style.mainContainer}>
      {rowData.map((row, idx) => (
        <Row key={idx} rowData={row} />
      ))}
    </View>
  );
};

export default Legend;

const style = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  square: {
    width: 20,
    height: 20,
    margin: 10,
    backgroundColor: '#aaaaaa',
  },
  cellContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-evenly',
    marginTop: 10,
    flexDirection: 'row',
    height: 40,
  },
  textStyle: {
    fontSize: 15,
  },
});
