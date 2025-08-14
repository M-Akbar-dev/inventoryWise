import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
// import RadioButton from '../RadioButton';
import { AppStyles, MetricsMod } from '../../themes';
import PropTypes from 'prop-types';
// import ToggleButton from '../ToggleButton';
// import VectorIconComponent from '../VectorIconComponent';
import VectorIconComponent from '..';

function CustomListItem(props) {
  const {
    isLeftIcon,
    iconType,
    iconName,
    text,
    isRadio,
    isActive,
    onPress,
    isToggle,
    containerStyle,
    textStyleContainer,
    iconColor,
    isLeftImage,
    imageName,
    iconSize,
    rightImageName,
    isRightImage,
    time,
    isChat,
    size = MetricsMod.doubleBaseMargin,
    leftImageStyle,
    isDisabled,
    isDivider,
  } = props;
  // console.log(isActive)
  return (
    <>
      <TouchableOpacity
        style={[styles.container, containerStyle,]}
        onPress={onPress}
        disabled={isDisabled}>
        <View style={styles.innerContainer}>
          {isLeftIcon && (
            <VectorIconComponent
              name={iconName}
              size={size}
              color={iconColor}
              type={iconType}
            />
          )}
          {isLeftImage && (
            <Image
              resizeMode={'contain'}
              style={[
                styles.imageStyle,
                leftImageStyle,
                ,
                isDisabled && { tintColor: AppStyles.colorSet.greyColor },
              ]}
              source={isChat ? { uri: imageName } : imageName}
            />
          )}
          <Text
            style={[
              styles.textStyle,
              textStyleContainer,
              isDisabled && { color: AppStyles.colorSet.greyColor },
            ]}
            numberOfLines={2}>
            {text}
          </Text>
        </View>
        {/* {isRadio && (
          <RadioButton isActive={isActive} size={iconSize} color={iconColor} />
        )} */}
        {/* {isToggle && (
          <ToggleButton isToggle={isActive} size={iconSize} color={iconColor} />
        )} */}
        <View style={time && { marginTop: -4 }}>
          {time && <Text style={[styles.timeStyle]}>{time}</Text>}
          {isRightImage ? (
            <Image
              resizeMode={'contain'}
              style={[styles.rightImageStyle, time && { marginTop: -8 }]}
              source={rightImageName}
            />
          ) : time ? (
            <View style={styles.rightImageStyle} />
          ) : null}
        </View>
      </TouchableOpacity>
      {isDivider && (
        <View
          style={{
            alignSelf: 'center',
            width: '90%',
            height: 1.5,
            backgroundColor: AppStyles.colorSet.dividerColor,
          }}
        />
      )}
    </>
  );
}

export default CustomListItem;

CustomListItem.propTypes = {
  isLeftIcon: PropTypes.bool,
  isLeftImage: PropTypes.bool,
  isDivider: PropTypes.bool,
  // iconType: PropTypes.func,
  iconName: PropTypes.string,
  text: PropTypes.string,
  isActive: PropTypes.any,
  isRadio: PropTypes.bool,
  isToggle: PropTypes.bool,
  isChat: PropTypes.bool,
  iconColor: PropTypes.string,
};

CustomListItem.defaultProps = {
  isLeftIcon: false,
  // iconType: () => {
  // },
  iconName: '',
  text: '',
  isActive: false,
  isDivider: false,
  isChat: false,
  isRadio: false,
  isToggle: false,
  iconColor: AppStyles.colorSet.primaryButtonColor,
};
