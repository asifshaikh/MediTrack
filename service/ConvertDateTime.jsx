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
