import React, {Component} from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';

import HeaderView from '../../../component/header/header.component';
import PieChartExample from './pieChart';
import Legend from '../../../component/legend/legend.component';
import {getAggregatedActivityData, getTypeActivityData} from './data.util';
import FromToDateBar from '../../../component/fromToDate/fromToDate.component';
//import ModalPieChart from './pieChart';

class ActivityPieScreen extends Component {
  constructor(props) {
    super(props);
    const startTime = new Date();
    const endTime = new Data();
    startTime.setHours(0, 0, 0, 0);
    endTime.setDate(startTime.getDate() + 1);
    endTime.setHours(0, 0, 0, 0);
    this.state = {
      startTime: startTime,
      endTime: endTime,
      modalVisible: false,
      type: 'Q2',
    };
    this.dataProperties = {
      Q1: {
        svg: {fill: '#e87a0c', onPress: () => this.popUpChart('Q1')},
      },
      Q2: {
        svg: {fill: '#2fb81a', onPress: () => this.popUpChart('Q2')},
      },
      Q3: {
        svg: {fill: '#b81a32', onPress: () => this.popUpChart('Q3')},
      },
      Q4: {
        svg: {fill: '#ff0800', onPress: () => this.popUpChart('Q4')},
      },
      R: {
        svg: {fill: '#b3b1b1', onPress: () => this.popUpChart('R')},
      },
    };
  }

  popUpChart = type => {
    this.setState({type});
    this.toggleVisibility();
  };

  toggleVisibility = () => {
    this.setState(prevState => ({modalVisible: !prevState.modalVisible}));
  };

  startDateChange = date => {
    date.setHours(0, 0, 0, 0);
    this.setState({startTime: date});
  };

  endDateChange = date => {
    date.setHours(23, 59, 59, 0);
    this.setState({endTime: date});
  };

  render() {
    const {startTime, endTime} = this.state;
    const data = getAggregatedActivityData(startTime, endTime)
      .filter(item => (item.value ? true : false))
      .map(item => ({...item, ...this.dataProperties[item.key]}));
    const modalData = getTypeActivityData(startTime, endTime, this.state.type);
    return (
      <View>
        <HeaderView title="Activity types" />
        <FromToDateBar
          startDate={this.state.startTime}
          endDate={this.state.endTime}
          onStartDateChange={this.startDateChange}
          onEndDateChange={this.endDateChange}
        />
        <PieChartExample data={data} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleVisibility}>
          <View style={style.mainContainer}>
            <View style={style.innerContainer}>
              <PieChartExample data={modalData} />
              <Legend cols={2} data={modalData} />
            </View>
          </View>
        </Modal>
        <Legend cols={2} data={data} />
      </View>
    );
  }
}

export default ActivityPieScreen;

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    opacity: 0.9,
    backgroundColor: '#aaaaaa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    flex: -1,
    opacity: 1,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    minHeight: 450,
    minWidth: 300,
  },
});
