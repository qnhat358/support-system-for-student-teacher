import moment from "moment";

export function formatDateString(dateString) {
  const formattedDate = moment(dateString).format("yyyy/MM/DD");
  return formattedDate;
}
