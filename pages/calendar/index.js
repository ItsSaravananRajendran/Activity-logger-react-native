import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ToolBar from '../../component/app-toolbar/toolbar.component';
import Sheet from '../../component/sheet/sheet.component';
import SearchableDropDown from '../../component/searchable-dropdown/searchable-dropdownbox.component';

import {
  getHiddenRowState,
  persistRowHiddenState,
  getScheduledActivities,
  insertScheduledActivities,
} from './data.utils';
import {
  getTimeWithInterval,
  getDayHeader,
  queryObjToArray,
  indicesToTimeSlot,
} from '../../utils/util.scripts';
import realm from '../../data/activities-schema';

class calendarScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View style={{marginRight: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={navigation.getParam('resetRowHeader')}>
            <Icon name="eye" size={24} color="white" />
          </TouchableOpacity>
          <SearchableDropDown
            data={realm.objects('Activity').map(({goalTime, ...obj}) => obj)}
            updateValue={navigation.getParam('setActivity')}
            extractValue={obj => obj.name}>
            <Icon name="edit" size={24} color="white" />
          </SearchableDropDown>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const queries = getScheduledActivities(date);
    const data = queryObjToArray(queries, date, 30);
    const isRowHidden = getHiddenRowState();
    const index = [];
    const loading = true;
    this.state = {
      loading,
      data,
      isRowHidden,
      index,
      date,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({setActivity: this._setActivity});
    this.props.navigation.setParams({resetRowHeader: this._resetRowHeader});
    setTimeout(() => this.setState({loading: false}), 0);
  }

  componentWillUnmount() {
    clearTimeout();
  }

  _setActivity = activity => {
    this.setState(prevState => {
      const indArr = [...prevState.index];
      const timeSlot = indicesToTimeSlot(prevState.date, indArr);
      insertScheduledActivities(activity.name, timeSlot);
      const queries = getScheduledActivities(prevState.date);
      const newData = queryObjToArray(queries, prevState.date, 30);
      return {
        data: newData,
        index: [],
      };
    });
  };

  _resetRowHeader = () => {
    const isRowHidden = new Array(48).fill(false);
    this.setState(
      {
        isRowHidden,
      },
      () => persistRowHiddenState(this.state.isRowHidden),
    );
  };

  onRowHeaderClick = idx => {
    this.setState(
      state => {
        let isRowHidden = [...state.isRowHidden];
        isRowHidden[idx] = true;
        return {isRowHidden};
      },
      () => persistRowHiddenState(this.state.isRowHidden),
    );
  };

  onCellPress = slot => {
    this.setState(prevState => {
      let arr = [...prevState.index];
      if (arr.includes(slot.key)) {
        for (let I = 0; I < arr.length; I++) {
          if (arr[I] === slot.key) {
            arr.splice(I, 1);
          }
        }
      } else {
        arr = [...prevState.index, slot.key];
      }
      return {index: arr};
    });
  };

  onDateChange = stringDate => {
    const date = new Date(stringDate);
    date.setHours(0, 0, 0, 0);
    const queries = getScheduledActivities(date);
    const data = queryObjToArray(queries, date, 30);
    this.setState({date, data});
  };

  render() {
    let rowHeader = getTimeWithInterval(30);
    let columnHeader = getDayHeader(this.state.date);
    return (
      <View style={{flex: 1}}>
        {this.state.loading ? (
          <View style={styles.main}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Sheet
            data={this.state.data}
            index={this.state.index}
            rowHiddenIndex={this.state.isRowHidden}
            rowHeader={rowHeader}
            columnHeader={columnHeader}
            onCellPress={this.onCellPress}
            onRowHeaderClick={this.onRowHeaderClick}
            onDateChange={this.onDateChange}
          />
        )}
      </View>
    );
  }
}

const calendarActivity_StackNavigator = createStackNavigator({
  Calendar: {
    screen: calendarScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Calendar',
      headerLeft: <ToolBar navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#3AAC68',
      },
      headerTintColor: '#fff',
    }),
  },
});

export {calendarActivity_StackNavigator};
export default calendarScreen;

const styles = StyleSheet.create({
  main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
