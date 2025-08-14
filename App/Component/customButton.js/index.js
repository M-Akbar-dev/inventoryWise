import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import PropTypes from 'prop-types';
 import styles from './styles';
import VectorIconComponent from '..';

function CustomButton(props) {
  const {
    title,
    onPress,
    disabled,
    buttonStyleWrapper,
    iconName,
    iconType,
    rightIcon,
    rightIconSize,
    rightIconColor,
    customTitleStyle,
    onPressIn,
    onLongPress
  } = props;

  const renderLeftIcon = () => {
    if (iconName) {
      return (
        <VectorIconComponent
          name={iconName}
          size={20}
          color={rightIconColor || 'white'}
          type={iconType}
        />
      );
    }
    return null;
  };

  const renderRightIcon = () => {
    if (rightIcon) {
      return (
        <VectorIconComponent
          name={rightIcon}
          size={rightIconSize || 20}
          color={rightIconColor || 'white'}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyleWrapper]}
      onPress={onPress}
      disabled={disabled}
      onPressIn={onPressIn}
      onLongPress={onLongPress}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
         {renderLeftIcon()}

         <Text style={[styles.buttonText, customTitleStyle]}>{title}</Text>

         {renderRightIcon()}
      </View>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  buttonStyleWrapper: PropTypes.object,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  rightIcon: PropTypes.string,
  rightIconSize: PropTypes.number,
  rightIconColor: PropTypes.string,
  customTitleStyle: PropTypes.object,
};

CustomButton.defaultProps = {
  disabled: false,
  iconName: null,
  iconType: 'FontAwesome',
  rightIcon: null,
  rightIconSize: 20,
  rightIconColor: 'white',
};

export default CustomButton;
