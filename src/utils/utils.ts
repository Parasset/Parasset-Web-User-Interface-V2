//@ts-nocheck
import BigNumber from 'bignumber.js'
function addZero(i) {
  return i < 10 ? '0' + i : i + ''
}
export const formatDate = (dateTime: any, language) => {
  if (dateTime !== 'start') {
    var t = dateTime - new Date().getTime()
    var date = Math.floor(t / 1000 / 60 / 60 / 24)
    var hour = Math.floor((t / 1000 / 60 / 60) % 24)
    var minute = Math.floor((t / 1000 / 60) % 60)
    var second = Math.floor((t / 1000) % 60)
    var txt = language === 'zh' ? '天 ' : 'day '
    var result = t > 0 ? addZero(date) + txt + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second) : 'end'
    return result
  } else {
    return 'start'
  }
}
export const formatDate1 = (datetime: any) => {
  datetime = new Date(datetime)
  // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
  var year = datetime.getFullYear(),
    month = ('0' + (datetime.getMonth() + 1)).slice(-2),
    date = ('0' + datetime.getDate()).slice(-2),
    hour = ('0' + datetime.getHours()).slice(-2),
    minute = ('0' + datetime.getMinutes()).slice(-2),
    second = ('0' + datetime.getSeconds()).slice(-2)
  // 拼接
  var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  // 返回
  return result
}

export const getDep = num => {
  //除法
  return new BigNumber(num).dp()
}
export const getQueryParam = (name, search) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}
