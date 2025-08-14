import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './styles';
import Images from '../../themes/Images';
import { AppStyles, MetricsMod } from '../../themes';
import VectorIconComponent from '..';
import { ICON_TYPES } from '../../constants/constant';

function CustomHeader({ title }) {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.toggleDrawer(); // works with DrawerNavigator
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={openDrawer} style={styles.iconWrapper}>
          <VectorIconComponent
            name="navicon"
            size={25}
            color={AppStyles.colorSet.white}
            style={styles.iconStylesUser}
            type={ICON_TYPES.FontAwesome}
          />         
        </TouchableOpacity>

        <Text style={styles.titleText}>{`${title}`}</Text>

        <View style={styles.iconWrapper} />
      </View>
    </View>
  );
}

CustomHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default CustomHeader;
