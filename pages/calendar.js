import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ToolBar from '../component/app-toolbar/toolbar.component';
import Sheet from '../component/sheet/sheet.component';
import SearchableDropDown from '../component/searchable-dropdown/searchable-dropdownbox.component';

import realm from '../data/activities-schema';
import {
  getTimeWithInterval,
  getDayHeader,
  queryObjToArray,
} from '../utils/util.scripts';

class calendarScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View style={{marginRight: 10}}>
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
    this.state = {
      isLoading: true,
      data: '',
      index: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({setActivity: this._setActivity});
  }

  _setActivity = activity => {
    this.setState({activity: activity});
  };

  onCellPress = slot => {
    this.setState(state => ({
      index: [...state.index, slot.key],
    }));
  };

  render() {
    let data = queryObjToArray([], this.state.date, 30);
    let rowHeader = getTimeWithInterval(30);
    let columnHeader = getDayHeader(this.state.date);
    return (
      <Sheet
        data={data}
        rowHeader={rowHeader}
        columnHeader={columnHeader}
        onCellPress={this.onCellPress}
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
