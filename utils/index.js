export const getBaseUrl = () => "http://180.76.185.112";

/** 格式化数字
 * @param {date} n 时间是单天的增加0 例: 6-1
 * @return {date} n 时间是单天的增加0 例: 06-01
 */
export const formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
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

export const isVehicleNumber = (vehicleNumber) => {
  const express =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
  let result = false;
  if (vehicleNumber.length == 7) result = express.test(vehicleNumber);
  return result;
};

// const isMobile = phonenum => /^1[3456789]\d{9}$/.test(phonenum);
export const isMobile = (phonenum) => /^1\d{10}$/.test(phonenum);

// 防止处理多次点击
export const noMultipleClick = (methods, info) => {
  // methods是需要点击后需要执行的函数， info是点击需要传的参数
  let that = this;
  if (that.noClick) {
    // 第一次点击
    that.noClick = false;
    if (info && info !== "") {
      // info是执行函数需要传的参数
      methods(info);
    } else {
      methods();
    }
    setTimeout(() => {
      that.noClick = true;
    }, 2000);
  } else {
    // 这里是重复点击的判断
  }
};
