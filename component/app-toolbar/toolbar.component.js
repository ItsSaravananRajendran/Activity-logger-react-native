import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

class ToolBar extends Component {
  //Structure for the navigation Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={this.toggleDrawer.bind(this)}
          style={styles.hamburger}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ToolBar;

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', width: 40},
  hamburger: {
    marginLeft: 10,
  },
});
