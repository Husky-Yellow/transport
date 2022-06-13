export const getBaseUrl = () => 'http://180.76.185.112'

/** 获取日期详情
 * @param {number} ts 时间戳
 */
export const getDateInfo = (ts) => {
  let date = new Date(ts * 1000);
  let weekDay = ["周天", "周一", "周二", "周三", "周四", "周五", "周六"];
  let dateString = formatTime(date);
  let shortDateString = dateString.replace(/\//g, "-").substring(0, 10);
  return {
    shortDateString,
    ts: ts,
    today_ts: Date.parse(new Date()),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: weekDay[date.getDay()],
  };
};

// 获取几天后或者几天前的时间
export const getDayObj = (day) => {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);
  return getDateInfo(targetday_milliseconds/1000)
}

//格式化日期时间
export const formatTime = (date) => {
  let separated = "-";
  wx.getSystemInfo({
    success: function (res) {
      if (res.platform == "devtools") {
      } else if (res.platform == "ios") {
        separated = "/";
      } else if (res.platform == "android") {
        separated = "-";
      }
    },
  });
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join(`${separated}`) +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

/** 格式化数字
 * @param {date} n 时间是单天的增加0 例: 6-1
 * @return {date} n 时间是单天的增加0 例: 06-01
 */
export const formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

/*
 * 判断昨今明
 * */
export const caleDate = (dayStr) => {
  dayStr = new Date(dayStr).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const dateObj = {
    "-86400000": "yesterday",
    0: "today",
    86400000: "tomorrow",
  };
  return dateObj[dayStr - today] || "超出昨今明范围";
}
