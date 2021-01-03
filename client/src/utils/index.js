import * as dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");

export function timeFromNow(timestamp) {
  dayjs.extend(relativeTime);
  return dayjs.unix(timestamp).fromNow();
}
