import moment from 'moment/moment';

export const FormatDate = (timestamp) => {
  return new Date(timestamp);
};
export const FormatDateForText = (date) => {
  return moment(date).format('ll');
};
export const FormatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return timeString;
};
export const getDatesRange = (startDate, endDate) => {
  const start = moment(startDate, 'MM/DD/YYYY');
  const end = moment(endDate, 'MM/DD/YYYY');
  const dates = [];
  while (start.isSameOrBefore(end)) {
    dates.push(start.format('MM/DD/YYYY'));
    start.add(1, 'days');
  }
  return dates;
};
export const getDatesRangeDisplay = () => {
  const dateList = [];
  for (let i = 0; i < 7; i++) {
    dateList.push({
      date: moment().add(i, 'days').format('DD'), //27
      day: moment().add(i, 'days').format('ddd'), //Sun,Mon,Tue
      formattedDate: moment().add(i, 'days').format('L'), //01/10/2025
    });
  }
  return dateList;
};
export const getDatesRangeDisplayForHistory = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, 'days');
    dates.push({
      date: date.format('DD'), //27
      day: date.format('dd'), //Sun,Mon,Tue
      formatted: date.format('L'), //01/10/2025
    });
  }
  return dates;
};
