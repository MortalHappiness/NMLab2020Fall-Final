import * as dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");

export function timeFromNow(time) {
  dayjs.extend(relativeTime);
  return dayjs(time).fromNow();
}
