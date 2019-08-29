import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button} from 'react-native-elements';

class Page2Screen extends Component {
  render() {
    const {navigation} = this.props;
    const name = navigation.getParam('itemId', 'WTF');
    return (
      <Button
        title={name}
        onPress={() => navigation('AddActivity', {itemId: 86})}
      />
    );
  }
}

export default Page2Screen;
