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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MyDatePicker from '../date-picker/date-picker.component';

const NUM_COLS = 7;
const NUM_ROWS = 48;
const CELL_WIDTH = 70;
const CELL_HEIGHT = 35;

class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.headerScrollView = null;
    this.scrollPosition = new Animated.Value(0);
    this.scrollEvent = Animated.event(
      [{nativeEvent: {contentOffset: {x: this.scrollPosition}}}],
      {useNativeDriver: false},
    );
  }

  handleScroll = e => {
    if (this.headerScrollView) {
      let scrollX = e.nativeEvent.contentOffset.x;
      this.headerScrollView.scrollTo({x: scrollX, animated: false});
    }
  };

  formatCell = (slot, style = styles.cell) => {
    return (
      <TouchableHighlight
        key={slot.key}
        onPress={() => {
          this.props.onCellPress(slot);
        }}>
        <View style={[style, this.isSelected[slot.key] && styles.selected]}>
          <Text>{slot.data}</Text>
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
    const column = columnData.item
      .filter(slot => {
        const idx = slot.key % NUM_ROWS;
        return !this.props.rowHiddenIndex[idx];
      })
      .map(slot => this.formatCell(slot));
    return <View style={styles.column}>{column}</View>;
  };

  formatHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.cell}>
          <MyDatePicker
            onDateChange={this.props.onDateChange}
            hideText={true}
            iconComponent={<Icon name="calendar-day" size={20} />}
          />
        </View>
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
      if (!this.props.rowHiddenIndex[I]) {
        rowHeader.push(this.rowHeaderData[I]);
      }
    }
    const rowHeaderColumn = rowHeader.map(({data, idx}) =>
      this.formatHeaderCell(data, idx, () => this.props.onRowHeaderClick(idx)),
    );
    return <View style={styles.identity}>{rowHeaderColumn}</View>;
  };

  formatBody = slotData => {
    let data = [];
    for (let I = 0; I < NUM_COLS; I++) {
      let start = I * NUM_ROWS;
      data.push(slotData.slice(start, start + NUM_ROWS));
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
    this.isSelected = new Array(NUM_COLS * NUM_ROWS).fill(false);
    for (const ind of this.props.index) {
      this.isSelected[ind] = true;
    }
    this.rowHeaderData = this.props.rowHeader.map((data, idx) => ({data, idx}));
    const slotData = this.props.data.map((data, index) => ({
      data: data,
      key: index,
    }));

    const body = this.formatBody(slotData);
    const data = [{key: 'body', render: body}];
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
    justifyContent: 'center',
    alignItems: 'center',
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: black,
  },
  column: {flexDirection: 'column'},
  selected: {backgroundColor: 'red'},
});
