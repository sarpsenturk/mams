import {formatDate} from "./format-date";

export function formatDatetime(date: Date) {
  return `${formatDate(date)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
