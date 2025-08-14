import { View } from 'react-native';
import React from 'react';
import styles from './styles';
// import AppStyles from '../../themes/AppStyles';
import { isEmpty } from 'lodash';
import { AppStyles } from '../../themes';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';

export default function CustomLoading(props) {
  const {
    containerStyles = styles.container,
    indicatorStyle = styles.indicatorStyle,
    size = 'large',
    customColor,
    color = isEmpty(customColor) ? AppStyles.colorSet.appRed : customColor,
  } = props;
  const loading = useSelector((state) => state.LoaderReducer.loading);

  return (
    <>
      {loading ?
        <View style={containerStyles}>
          <ActivityIndicator style={indicatorStyle} size={size} color={color} />
        </View>
        :
        null}

    </>

  );
}