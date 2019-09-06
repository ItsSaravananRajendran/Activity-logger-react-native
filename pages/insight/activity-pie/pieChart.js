import React from 'react';
import {PieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import {View, StyleSheet} from 'react-native';

class PieChartExample extends React.PureComponent {
  render() {
    const {data} = this.props;
    const Labels = ({slices, height, width}) => {
      return slices.map((slice, index) => {
        const {labelCentroid, pieCentroid, data} = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={0.2}>
            {`${data.label}`}
          </Text>
        );
      });
    };

    return (
      <View>
        <PieChart
          style={style.chartStyle}
          valueAccessor={({item}) => item.value}
          data={data}
          spacing={0}
          outerRadius={'95%'}>
          <Labels />
        </PieChart>
      </View>
    );
  }
}

export default PieChartExample;

const style = StyleSheet.create({
  chartStyle: {
    height: 350,
  },
});
