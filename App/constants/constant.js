import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {AppStyles, Images} from '../themes';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export const LANGUAGE_KEY = {
  ENGLISH: 'en',
};
export const LANGUAGE_NAME = {
  ENGLISH: 'english',
};
export const LANGUAGE_LIST = [
  {
    languageKey: LANGUAGE_KEY.ENGLISH,
    title: 'english',
    isRTL: false,
  },
];

export const ICON_TYPES = {
  AntDesign: 'AntDesign',
  IonIcons: 'Ionicons',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  SimpleLineIcons: 'SimpleLineIcons',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Octicons: 'Octicons',
  Feather: 'Feather',
  Foundation: 'Foundation',
  Fontisto: 'Fontisto',
};

 

export const TIMES = [
  {
    title: 'Time',
    Time: '09:00 am',
    index: 1,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '10:00 am',
    index: 2,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '11:00 am',
    index: 3,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '12:00 pm',
    index: 4,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '01:00 pm',
    index: 5,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '02:00 pm',
    index: 6,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '03:00 pm',
    index: 7,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '04:00 pm',
    index: 8,
    bg: AppStyles.colorSet.white,
  },
  {
    title: 'Time',
    Time: '05:00 pm',
    index: 9,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '06:00 pm',
    index: 10,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '07:00 pm',
    index: 11,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '08:00 pm',
    index: 12,
    bg: AppStyles.colorSet.white,
  },
  {
    title: 'Time',
    Time: '09:00 pm',
    index: 13,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '10:00 pm',
    index: 14,
    bg: AppStyles.colorSet.gradientColorIV,
  },
  {
    title: 'Time',
    Time: '11:00 pm',
    index: 15,
    bg: AppStyles.colorSet.white,
  },
];

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const GENDER_LIST = [
  {
    name: 'Male',
    key: 'M',
  },
  {
    name: 'Female',
    key: 'F',
  },
];

let startOfWeek = moment().startOf('week').toDate().getDate();
let endOfWeek = moment().endOf('week').toDate().getDate();

export const MONTH_NAMES = [
  {
    name: 'Sun',
    dayNumber: startOfWeek,
  },
  {
    name: 'Mon',
    dayNumber: startOfWeek + 1,
  },
  {
    name: 'Tue',
    dayNumber: startOfWeek + 2,
  },
  {
    name: 'Wed',
    dayNumber: startOfWeek + 3,
  },
  {
    name: 'Thu',
    dayNumber: startOfWeek + 4,
  },
  {
    name: 'Fri',
    dayNumber: startOfWeek + 5,
  },
  {
    name: 'Sat',
    dayNumber: endOfWeek,
  },
];

export const DAYS = [
  {
    name: 'Sun',
    fullName: 'Sunday',
    id: '1',
    isSelected: false,
  },
  {
    name: 'Mon',
    fullName: 'Monday',
    id: '2',
    isSelected: false,
  },
  {
    name: 'Tue',
    fullName: 'Tuesday',
    id: '3',
    isSelected: false,
  },
  {
    name: 'Wed',
    fullName: 'Wednesday',
    id: '4',
    isSelected: false,
  },
  {
    name: 'Thu',
    fullName: 'Thursday',
    id: '5',
    isSelected: false,
  },
  {
    name: 'Fri',
    fullName: 'Friday',
    id: '6',
    isSelected: false,
  },
  {
    name: 'Sat',
    fullName: 'Saturday',
    id: '7',
    isSelected: false,
  },
];

export const MONTH_DAYS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

export function generateArrayOfYears() {
  let max = new Date().getFullYear();
  let min = max - 62;
  let years = [];

  for (let i = min; i <= max; i++) {
    years.push(i);
  }
  return years;
}

export const currentSelectedDate = date => {
  let val = {};
  MONTH_NAMES.forEach(item => {
    if (item.value === String(date)) {
      val = item;
    }
  });
  return val;
};

export const validEmail = e => {
  let filter = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return String(e).search(filter) !== -1;
};

export const setStorageItem = (key, value) => {
  return AsyncStorage.setItem(key, value);
};

export const getAsyncStorageItem = async (key = '') => {
  if (!key) {
    return null;
  }

  return AsyncStorage.getItem(key);
};

export const STORAGE_KEYS = {
  FCM_TOKEN: 'FcmToken',
  IOS_FCM: 'IosFcm',
};

export const NOTIFICATIONS_TYPES = {
  NEW_BOOKING: 'New Booking',
  BOOKING_CANCELLED: 'Booking Cancelled',
  NEW_MESSAGE: 'New Message',
  BOOKING_UPDATED: 'Booking Updated',
};
