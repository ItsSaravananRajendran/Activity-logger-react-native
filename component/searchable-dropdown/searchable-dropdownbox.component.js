import React, {Component} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

class SearchableDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      searchValue: '',
    };
    this.extractValue = this.props.extractValue;
    this.data = this.props.data.map(obj => ({
      key: obj.name,
      ...obj,
    }));
    this.filteredData = this.data.map(obj => ({...obj}));
  }

  toggleVisibility = () => {
    this.setState(state => ({modalVisible: !state.modalVisible}));
  };

  filterData = text => {
    this.data = this.props.data.map(obj => ({
      key: obj.name,
      ...obj,
    }));
    this.setState({searchValue: text});
    this.filteredData = this.data.filter(obj =>
      this.props
        .extractValue(obj)
        .toLowerCase()
        .includes(text.toLowerCase()),
    );
    if (this.filteredData.length === 0) {
      this.filteredData = [{key: 1, name: 'No results found'}];
    }
  };

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.toggleVisibility}>
          {this.props.children}
        </TouchableHighlight>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => {
            this.search.focus();
          }}
          onRequestClose={() => {
            this.toggleVisibility();
          }}>
          <View style={style.mainContainer}>
            <View style={style.innerContainer}>
              <SearchBar
                placeholder="Select an activity"
                value={this.state.searchValue}
                onChangeText={this.filterData}
                lightTheme={true}
                ref={reference => {
                  this.search = reference;
                }}
              />
              <ScrollView keyboardShouldPersistTaps="handled">
                {this.filteredData.map(({key, ...obj}) => (
                  <TouchableHighlight
                    key={key}
                    onPress={() => {
                      this.props.updateValue(obj);
                      this.setState({searchValue: ''});
                      this.toggleVisibility();
                    }}>
                    <View style={style.listView}>
                      <Text style={style.textStyle}>
                        {this.extractValue(obj)}
                      </Text>
                    </View>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SearchableDropDown;

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
    minHeight: 300,
    minWidth: 200,
    maxHeight: 350,
  },
  listView: {
    width: 300,
    height: 30,
    marginTop: 10,
    marginLeft: 10,
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'left',
  },
  inputStyle: {
    height: 50,
    width: 300,
  },
});
