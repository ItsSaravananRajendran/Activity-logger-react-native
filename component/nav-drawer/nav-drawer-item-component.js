import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NavDrawerItem = props => {
  const {iconName, title} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}> {title} </Text>
      </View>
    </View>
  );
};

export default NavDrawerItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    margin: 12,
  },
  iconContainer: {
    height: 24,
    width: 24,
  },
  textStyle: {
    fontSize: 17,
  },
});
