import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/Actions/AlertAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { AppStyles } from '../../themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// Create Animated SafeAreaView
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const CustomAlert = () => {
  const dispatch = useDispatch();
  const { visible, type, message } = useSelector(state => state.alertReducer);

  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 700,
          useNativeDriver: true,
        }).start(() => dispatch(hideAlert()));
      }, 8000);
    }
  }, [visible, slideAnim, dispatch]);

  if (!visible) return null;

  return (
    <AnimatedSafeAreaView style={[styles.alertContainer, { transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.alerContent, styles[type]]}>
        {type === 'error' && (
          <MaterialIcons
            name="error"
            size={20}
            color="rgba(255, 255, 255, 1)"
            style={{ padding: 5, marginLeft: 4 }}
          />
        )}
        {type === 'success' && (
          <AntDesign
            name="checkcircleo"
            size={20}
            color="rgba(255, 255, 255, 1)"
            style={{ padding: 5, marginLeft: 4 }}
          />
        )}
        {type === 'warning' && (
          <AntDesign
            name="warning"
            size={20}
            color="rgba(255, 255, 255, 0.5)"
            style={{ padding: 5, marginLeft: 4 }}
          />
        )}

        <View style={styles.messageContainer}>
          <Text style={styles.alertMessage}>{message}</Text>
        </View>

        <TouchableOpacity onPress={() => dispatch(hideAlert())} style={styles[`${type}Button`]}>
          <Entypo name="cross" size={25} color={AppStyles.colorSet.white} />
        </TouchableOpacity>
      </View>
    </AnimatedSafeAreaView>
  );
};

export default CustomAlert;
