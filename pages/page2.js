import React, {Component} from 'react';
import {Text} from 'react-native';

class Page2Screen extends Component {
  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('itemId', 'WTF');
    return <Text> {name} </Text>;
  }
}

export default Page2Screen;
