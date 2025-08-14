import { get, isEmpty } from "lodash";
import moment from 'moment';
// import { printLogs } from './logUtils';
import { da } from "date-fns/locale";

export const getParams = props => get(props, 'route.params', {});

export const percentage = (percent, total) => {
  if (total === undefined) {
    return '00';
  } else {
    return ((percent / 100) * total).toFixed(0);
  }
};

export const validateEmail = email => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// export const passwordRegex = password => {
//   let re =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
//   return re.test(password);
// };

export const passwordRegex = (password) => {
  let re = /^[0-9]+$/; // Regex  for special digit is not allowed 
  return re.test(password);
};

// export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

export const currentDateFunc = date => {
  const format = 'dddd MMM DD hh:mm A';
  return moment(date).format(format);
};
export const currentTime = date => {
  const format = 'hh:mm A';
  return moment(date).format(format);
};
export const todayDateFunc = date => {
  const format = 'yy-MM-DD';
  return moment(date).format(format);
};

export const currentDate = date => {
  const format = 'dddd MMM DD yyyy';
  return moment(date).format(format);
};
export const birthdayDateFunc = date => {
  const format = 'dddd MMM DD yy';
  return moment(date).format(format);
};

export const currentTimeFunc = () => {
  const format = 'hh';
  const date = new Date();
  return moment(date).format(format);
};

export const currentAMPMFunc = () => {
  const format = 'A';
  const date = new Date();
  return moment(date).format(format);
};

export const year = date => {
  const format = 'yy';
  return moment(date).format(format);
};

export const yearMonth = date => {
  const format = 'MMM yy';
  return moment(date).format(format);
};

export const month = date => {
  const format = 'MMM';
  return moment(date).format(format);
};

export const replace = (key, value, selectedItem, array) => {
  // printLogs({ key, value, selectedItem, array });
  array.forEach(function (o) {
    if (o.id === selectedItem.id) {
      // printLogs(o.id === selectedItem.id);
      if (key in o) {
        // printLogs({ o });
        o[key] = value;
      }
    }
  });
};

const isToday = d => {
  const d1 = new Date();
  return (
    d.getFullYear() === d1.getFullYear() &&
    d.getMonth() === d1.getMonth() &&
    d.getDate() === d1.getDate()
  );
};

export const helperFunction = (date, time) => {
  // printLogs({ date, time });
  const [yyyy, mm, dd] = date.split('-');
  let d = new Date(yyyy, mm - 1, dd);
  if (isToday(d)) {
    const hhmm = d.toTimeString().match(/(\d{2}:\d{2}):.*/)[1];
    const range = time.split('-');
    return hhmm >= range[0] && hhmm <= range[1];
  }
  return false;
};

export const filterArrayByID = (array1, array2) => {
  let output = [];
  array1?.forEach(function (item) {
    // printLogs({ item });
    array2?.filter(array2Item => {
      // printLogs({ array2Item });
      if (String(item?.id) === String(array2Item)) {
        output.push(item);
      }
    });
  });

  // printLogs({ output });
  return output;
};

export const filterChat = (data, searchStr = '') => {
  if (!isEmpty(searchStr)) {

    return data.filter(({ senderFirstName, MessageDetails }) => {
      return (
        senderFirstName.toLowerCase().includes(searchStr)
        //  ||
      );
    });

    // MessageDetails.toLowerCase().includes(searchStr)
  }
  // else if (!searchStr) {
  //   return data
  // }
  // else {
  //   return []
  // }
};
