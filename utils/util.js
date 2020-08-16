const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  const uniqueArr = arr => {
    var res = []
    var obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 1;
        res.push(arr[i]);
      }
    }
    return res
  }
  //日期时间格式化
  const dateFtt = function (fmt, dateVal) {
    var date = new Date(dateVal);
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  /**时间转换2*/
  const dateFtt2 = function (dates, formatStr) {
    formatStr = formatStr || 'yyyy-MM-dd HH:mm:ss';
    let f2 = function (m) {
      return m < 10 ? `0${m}` : m
    }
    let newDates = new Date(dates)
    let str = formatStr.replace('yyyy', newDates.getFullYear())
    str = str.replace('MM', f2(newDates.getMonth() + 1))
    str = str.replace('dd', f2(newDates.getDate()))
    str = str.replace('HH', f2(newDates.getHours()))
    str = str.replace('mm', f2(newDates.getMinutes()))
    str = str.replace('ss', f2(newDates.getSeconds()))
    return str
  }
  const getDateYearSub = function (startDateStr) {
    if (!startDateStr)
      return "";
    let currYear = new Date().getFullYear()
    let day = 24 * 60 * 60 * 1000;
    var sDate = new Date(Date.parse(startDateStr.replace(/-/g, "/")))
    var eDate = new Date(Date.parse(currYear + '/' + '01' + '/' + '01'))
  
    //得到前一天(算头不算尾)
    sDate = new Date(sDate.getTime() - day);
    //获得各自的年、月、日
    var sY = sDate.getFullYear();
    var sM = sDate.getMonth() + 1;
    var sD = sDate.getDate();
    var eY = eDate.getFullYear();
    var eM = eDate.getMonth() + 1;
    var eD = eDate.getDate();
    if (Number(currYear - sY) > 0) {
      return Number(currYear - sY)
    } else {
      return 0
    }
  }
  //获取今天日期、星期
  const getTodayAndWeek = (dateStr) => {
    var d = new Date();
    if (dateStr) {
      d = new Date(dateStr.replace(/-/g, "/"));
    }
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    var ds = d.getDate();
    if (ds <= 9) {
      ds = '0' + ds;
    }
    var h = d.getHours();
  
    if (h <= 9) {
      h = '0' + h;
    }
    var f = d.getMinutes();
    if (f <= 9) {
      f = '0' + f;
    }
    var s = d.getSeconds();
    if (s <= 9) {
      s = '0' + s;
    }
    var days = d.getDay();
    switch (days) {
      case 1:
        days = '周一';
        break;
      case 2:
        days = '周二';
        break;
      case 3:
        days = '周三';
        break;
      case 4:
        days = '周四';
        break;
      case 5:
        days = '周五';
        break;
      case 6:
        days = '周六';
        break;
      case 0:
        days = '周日';
        break;
    }
    var toDays = {}
    toDays.dayOne = y + '-' + (m < 10 ? '0' + m : m) + '-' + ds
    toDays.days = m + '月' + ds + '日'
    toDays.dayss = y + '/' + m + '/' + ds
    toDays.weeks = days
    return toDays.days + ' ' + toDays.weeks
  }
  //获取今天日期、星期
  const getToday = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    var ds = d.getDate();
    if (ds <= 9) {
      ds = '0' + ds;
    }
    var h = d.getHours();
    if (h <= 9) {
      h = '0' + h;
    }
    var f = d.getMinutes();
    if (f <= 9) {
      f = '0' + f;
    }
    var s = d.getSeconds();
    if (s <= 9) {
      s = '0' + s;
    }
    var toDays = {}
    toDays.dayOne = y + '-' + (m < 10 ? '0' + m : m) + '-' + ds
    toDays.dayss = y + '/' + m + '/' + ds
    return toDays
  }
  //特殊时间处理 10:10:00去掉最后00
  const exTimesOO = (times) => {
    if (times) {
      var timesA = times.split(":")
      return timesA[0] + ":" + timesA[1]
    }
  }
  //判断当前用户是否已经过期
  const checkMemberClick = () => {
    const memberInfo = wx.getStorageSync("userInfo")
    var backObj = {}
    var endDateStr = ''
    if (memberInfo) {
      if (memberInfo.goodRule) {
        endDateStr = memberInfo.goodRule.endDate
        const nowCheckDate2 = getNDayStr(endDateStr, 1)
        backObj.sure = nowCheckDate2.yes
        backObj.isVip = true
        backObj.vipName = memberInfo.goodRule.ruleName
        backObj.time = endDateStr
      } else {
        //非充值用户，看是否小于试用时间
        const nowCheckDate = getNDayStr(memberInfo.createTime, 7)
        backObj.sure = nowCheckDate.yes
        backObj.isVip = false
        backObj.vipName = 'VIP'
        backObj.time = nowCheckDate.date
      }
    } else {
      backObj.sure = false
      backObj.isVip = false
      backObj.vipName = ''
      backObj.time = null
    }
    var tipStr = ''
    if (backObj.sure == false) {
      if (backObj.time) {
        if (backObj.isVip) {
          tipStr = '尊敬的' + backObj.vipName + '会员，权益时间为：' + backObj.time + '，已过期，请充值后使用'
        } else {
          tipStr = '您的试用期时间为：' + backObj.time + ',已过期，请充值后使用'
        }
      } else {
        tipStr = '请登录后再使用此功能'
      }
      wx.showModal({
        title: '温馨提示',
        content: tipStr,
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/me/kefukefu',
            })
          } else if (res.cancel) {
            return false;
          }
        }
      })
      return false;
    } else {
      return true
    }
    // return backObj
  }
  //获取第N天前后日期
  const getNDayStr = (startTime, Nums) => {
    var sdate = new Date(startTime.replace(/-/g, "/"));
    var strdate = new Date(), nowTime = new Date()
    var begindate = sdate.getTime();
    var enddate = begindate + (parseInt(Nums) * 24 * 60 * 60 * 1000);
    strdate.setTime(enddate);
    var str = {}
    str.originalDate = strdate
    str.date = dateFtt("yyyy年MM月dd日", strdate);
    if (nowTime.getTime() > strdate.getTime()) {
      str.yes = false
    } else {
      str.yes = true
    }
    return str
  }
  //判断某日期是否小于今天
  const checkTwoDays = (times) => {
    if (times) {
      var docDate = new Date(times.replace(/-/g, "/"))
      const todays = getToday()
      var nowDate = new Date(todays.dayss)
  
      console.log(docDate.getTime(), nowDate.getTime())
      if ((docDate.getTime()) < (nowDate.getTime())) {
        return true;
      } else {
        return false;
      }
    }
  }
  //秒数返回时分
  const plantime = (times) => {
    var min = Math.floor(times % 3600)
    return Math.floor(times / 3600) + "时" + Math.floor(min / 60) + "分"//Math.floor(time/3600) + "时" + Math.floor(min/60) + "分"+ time%60 + "秒"
  }
  //通过开始时间，得出结束时间
  const exTimesOE = (startTime, longTime) => {
    const todays = getToday()
    var nowA = new Date(todays.dayss + ' ' + startTime)
    var nowB = (parseInt((nowA.getTime() / 1000)) + parseInt(longTime)) * 1000
    console.log(nowB)
    return dateFtt2(nowB, 'HH:mm')
  }
  //通过开始时间，得出该时间的时间标
  const exstartTimesOE = (startTime) => {
    const todays = getToday()
    return new Date(todays.dayss + ' ' + startTime)
  }
  // 计算两个日期的间隔时间（时间差）
  const dateDifference = (t1, t2, tg) => {
    // t1 = '2020/07/05 10:52:52'
    // t2 = new Date()
    // tg = 'd,h,m,s'
    //相差的毫秒数
    let ms = Date.parse(t1) - Date.parse(t2)
    let minutes = 1000 * 60
    let hours = minutes * 60
    let days = hours * 24
    let years = days * 365
    //求出天数
    let d = Math.floor(ms / days)
    //求出除开天数，剩余的毫秒数
    ms %= days
    let h = Math.floor(ms / hours)
    ms %= hours
    let m = Math.floor(ms / minutes)
    ms %= minutes
    let s = Math.floor(ms / 1000)
    let str = ''
    //返回所需值并退出函数
    if (tg.indexOf("d") > -1) {
      str += d > 0 ? d + '天' : ''
    }
    if (tg.indexOf("h") > -1) {
      str += h + '时'
    }
    if (tg.indexOf("m") > -1) {
      str += m + '分'
    }
    if (tg.indexOf("s") > -1) {
      str += s + '秒'
    }
    return str
  }
  const checkPhone = (phone) => {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    }
    return true;
  }
  module.exports = {
    formatTime: formatTime,
    uniqueArr: uniqueArr,
    dateFtt: dateFtt,
    dateFtt2: dateFtt2,
    getDateYearSub: getDateYearSub,
    getTodayAndWeek: getTodayAndWeek,
    exTimesOO: exTimesOO,
    exTimesOE: exTimesOE,
    plantime: plantime,
    checkTwoDays: checkTwoDays,
    getToday: getToday,
    checkPhone: checkPhone,
    exstartTimesOE: exstartTimesOE,
    dateDifference: dateDifference,
    getNDayStr: getNDayStr,
    checkMemberClick: checkMemberClick
  }
  