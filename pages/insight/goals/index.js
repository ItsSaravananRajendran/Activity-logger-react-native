import React, {Component} from 'react';
import {Text, View} from 'react-native';

import HeaderView from '../../../component/header/header.component';

class GoalScreen extends Component {
  render() {
    return (
      <View>
        <HeaderView title="Goals" />
      </View>
    );
  }
}

export default GoalScreen;
