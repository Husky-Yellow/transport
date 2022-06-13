export const datatime = (time) => {
  const myDate = new Date(); //获取当天日期
  const dateArray = [];
  let flag = 1;
  myDate.setDate(myDate.getDate() - time);
  // 日期格式化
  for (let i = 0; i < time; i++) {
    let week = myDate.getDay();
    let month = formatNumber(myDate.getMonth() + 1) || "0";
    let day = formatNumber(myDate.getDate()) || "0";
    // YY-MM-DD
    let dateTemp = `${myDate.getFullYear()}-${month}-${day}`;
    dateArray.push({
      dateTemp,
      month,
      day,
      week,
    });
    //  console.log(dateArray)
    //若不加flag则结果都是一个日期（当前日期减time天）
    //日期 +1 天，此日期为减time天后的日期
    myDate.setDate(myDate.getDate() + flag);
  }
  return dateArray;
};

// 获取本月时间并获取本月日历数据
export const getForMonth = () => {
  let myDate = new Date(); //获取系统当前时间
  let sysmonth = myDate.getMonth() + 1;
  let nowYear = myDate.getFullYear(); //当前是本年
  // 算时间戳
  myDate.setDate(1);
  myDate.setHours(0);
  myDate.setSeconds(0);
  myDate.setMinutes(0);
  let timeStart = parseInt(myDate.getTime() / 1000); //本月第一天0点
  //时间戳计算结束
  //将该月信息添加到数组中
  let dateList = [];
  //获取当前月份天数
  let now_month_day_num = monthDay(sysmonth, nowYear);
  for (let i = 0; i < now_month_day_num; i++) {
    let obj = getDateInfo(timeStart + i * 24 * 60 * 60);
    obj.isChoose = i == 0;
    dateList.push(obj);
  }
  // 获取今天日期.以作滑动使用
  const todayIndex = (dateList || []).findIndex(
    (list) => list.day === new Date().getDate()
  );
  //调接口 获取该月每天的数据信息
  return {
    dateList,
    todayIndex,
  };
};

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

export const getDayObj = (day) => {
  let today = new Date();
  let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); //注意，这行是关键代码
  return getDateInfo(targetday_milliseconds/1000)
}

/** 根据年月获取当前日期
 * @param {number} month
 * @param {number} year
 */
export function monthDay(month, year) {
  let allday;
  //判断月分是大月还是小月
  //就可以得出这个月除了2月外是30天还是31天
  if (month !== 2) {
    if (month === 4 || month === 6 || month === 9 || month === 11) allday = 30;
    else allday = 31;
  } else {
    //判断是否是闰年
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) allday = 29;
    else allday = 28;
  }
  return allday;
}

//格式化日期时间
export function formatTime(date) {
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
export function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

/*
 * 获取年月日时分秒
 * */
export const getDate = (dateStr) => {
  const timeArr = dateStr.replace(" ", ":").replace(/\:/g, "-").split("-");
  if (timeArr.length < 6) return "格式错误";
  return {
    year: timeArr[0],
    month: timeArr[1],
    day: timeArr[2],
    hour: timeArr[3],
    minute: timeArr[4],
    seconds: timeArr[5],
  };
};

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
};
