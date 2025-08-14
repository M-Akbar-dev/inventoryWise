import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { ICON_TYPES } from '../constants/constant';

function VectorIconComponent(props) {
  const {name, size, type, style, color, onPress} = props;

  switch (type) {
    case ICON_TYPES.AntDesign:
      return (
        <AntDesign
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.IonIcons:
      return (
        <IoniconsIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.FontAwesome:
      return (
        <FontAwesomeIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.Feather:
      return (
        <Feather
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.FontAwesome5:
      return (
        <FontAwesome5Icons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.SimpleLineIcons:
      return (
        <SimpleLineIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.MaterialIcons:
      return (
        <MaterialIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.Entypo:
      return (
        <EntypoIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.EvilIcons:
      return (
        <EvilIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.Octicons:
      return (
        <OcticonsIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.Foundation:
      return (
        <Foundation
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case ICON_TYPES.Fontisto:
      return (
        <Foundation
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    default:
      return (
        <EntypoIcons
          style={style}
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
  }
}

export default VectorIconComponent;
