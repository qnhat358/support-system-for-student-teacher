import moment from "moment";

export function formatDateString(dateString) {
  if (dateString == '' || dateString == null ) return dateString;
  const formattedDate = moment(dateString).format("DD/MM/YYYY");
  return formattedDate;
}
