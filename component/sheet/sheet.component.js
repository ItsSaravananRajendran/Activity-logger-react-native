// source : https://snack.expo.io/@shrey/highly-responsive-sheet

import React from 'react';
import {
  TouchableHighlight,
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';

const NUM_COLS = 7;
const NUM_ROWS = 48;
const CELL_WIDTH = 70;
const CELL_HEIGHT = 20;

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.headerScrollView = null;
    this.scrollPosition = new Animated.Value(0);
    this.scrollEvent = Animated.event(
      [{nativeEvent: {contentOffset: {x: this.scrollPosition}}}],
      {useNativeDriver: false},
    );
    let slot = this.props.data.map((data, index) => ({
      data: data,
      isSelected: false,
      key: index,
    }));
    this.state = {slot: slot, isRowHidden: ''};
  }

  handleScroll = e => {
    if (this.headerScrollView) {
      let scrollX = e.nativeEvent.contentOffset.x;
      this.headerScrollView.scrollTo({x: scrollX, animated: false});
    }
  };

  handleCellClick = slot => {
    ToastAndroid.show(String(slot.data), ToastAndroid.short);
    this.setState(state => {
      let item = [...this.state.slot];
      item[slot.key] = {...slot, isSelected: !slot.isSelected};
      return {data: item};
    });

    this.props.onCellPress(slot);
  };

  handleRowHeaderClick = idx => {
    this.setState(state => {
      let isRowHidden = [...state.isRowHidden];
      isRowHidden[idx] = !isRowHidden[idx];
      return {isRowHidden: isRowHidden};
    });
  };

  formatCell = (slot, style = styles.cell) => {
    return (
      <TouchableHighlight key={slot.key} onPress={this.handleCellClick}>
        <View style={[style, slot.isSelected && styles.selected]}>
          <Text>{slot.data || ' '}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  formatHeaderCell = (data, key, callback = () => '', style = styles.cell) => {
    return (
      <TouchableHighlight key={key} onPress={callback}>
        <View style={style}>
          <Text>{data}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  formatColumn = columnData => {
    let column = columnData.item.map(slot => this.formatCell(slot));
    return <View style={styles.column}>{column}</View>;
  };

  formatHeader = () => {
    return (
      <View style={styles.header}>
        {this.formatHeaderCell('Date')}
        <ScrollView
          ref={ref => (this.headerScrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          scrollEventThrottle={16}>
          {this.props.columnHeader.map((data, idx) =>
            this.formatHeaderCell(data, idx),
          )}
        </ScrollView>
      </View>
    );
  };

  formatIdentityColumn = () => {
    let rowHeader = [];
    for (let I = 0; I < NUM_ROWS; I++) {
      if (!this.state.isRowHidden[I]) {
        rowHeader.push(this.props.rowHeader[I]);
      }
    }
    let rowHeaderColumn = rowHeader.map((data, idx) =>
      this.formatHeaderCell(data, idx, idx => this.handleRowHeaderClick),
    );
    return <View style={styles.identity}>{rowHeaderColumn}</View>;
  };

  formatBody = () => {
    let data = [];
    for (let I = 0; I < NUM_COLS; I++) {
      if (!this.state.isRowHidden[I]) {
        let start = I * NUM_ROWS;
        data.push(this.state.slot.slice(start, start + NUM_ROWS));
      }
    }

    return (
      <View>
        {this.formatIdentityColumn()}
        <FlatList
          style={styles.body}
          horizontal={true}
          data={data}
          renderItem={this.formatColumn}
          stickyHeaderIndices={[0]}
          onScroll={this.scrollEvent}
          scrollEventThrottle={16}
          extraData={this.state}
        />
      </View>
    );
  };

  formatRowForSheet = section => {
    let {item} = section;
    return item.render;
  };

  componentDidMount() {
    this.listener = this.scrollPosition.addListener(position => {
      this.headerScrollView.scrollTo({x: position.value, animated: false});
    });
  }

  render() {
    let body = this.formatBody();

    let data = [{key: 'body', render: body}];

    return (
      <View style={styles.container}>
        {this.formatHeader()}
        <FlatList data={data} renderItem={this.formatRowForSheet} />
      </View>
    );
  }
}

export default Sheet;

const black = '#000';
const white = '#fff';
const styles = StyleSheet.create({
  container: {backgroundColor: white, marginVertical: 40, marginBottom: 80},
  header: {flexDirection: 'row', borderTopWidth: 1, borderColor: black},
  identity: {position: 'absolute', width: CELL_WIDTH},
  body: {marginLeft: CELL_WIDTH},
  cell: {
    alignItems: 'center',
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: black,
  },
  column: {flexDirection: 'column'},
  selected: {},
});
