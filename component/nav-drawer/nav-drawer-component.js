import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation';

const customNavigationDrawer = props => (
  <View>
    <View style={styles.mainComponent}>
      <Text> Header </Text>
    </View>
    <DrawerItems {...props} />
  </View>
);

export default customNavigationDrawer;

const styles = StyleSheet.create({
  mainComponent: {
    backgroundColor: '#ffffff',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
