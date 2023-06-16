import moment from "moment";

export function toHHMMstring(time) {
  return moment(time, 'HH:mm:ss').format('HH:mm');
}

export function toISOdate(date) {
  return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
}