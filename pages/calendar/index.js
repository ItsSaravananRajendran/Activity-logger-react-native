import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ToolBar from '../../component/app-toolbar/toolbar.component';
import Sheet from '../../component/sheet/sheet.component';
import SearchableDropDown from '../../component/searchable-dropdown/searchable-dropdownbox.component';

import {getHiddenRowState, persistRowHiddenState} from './data.utils';
import {
  getTimeWithInterval,
  getDayHeader,
  queryObjToArray,
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
    const data = queryObjToArray([], new Date(), 30);
    const isRowHidden = getHiddenRowState();
    const index = [];
    const isLoading = true;
    const date = new Date();
    this.state = {
      isLoading,
      data,
      isRowHidden,
      index,
      date,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({setActivity: this._setActivity});
    this.props.navigation.setParams({resetRowHeader: this._resetRowHeader});
  }

  _setActivity = activity => {
    this.setState(prevState => {
      let indArr = [...prevState.index];
      let newData = [...prevState.data];
      for (let I of indArr) {
        newData[I] = activity.name;
      }
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
    const data = queryObjToArray([], data, 30);
    this.setState({date, data});
  };

  render() {
    let rowHeader = getTimeWithInterval(30);
    let columnHeader = getDayHeader(this.state.date);
    return (
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
  main: {flex: 1, flexDirection: 'row'},
});
