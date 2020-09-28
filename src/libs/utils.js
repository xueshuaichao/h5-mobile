/*
 * 数字序号转字符串序号  0 => "A"
 */
export function indexToString(index){
    var charcode;
    return index.toString(26).split("").map(function(item){
        charcode = item.charCodeAt(0);
        charcode+=(charcode>=97?10:49);
        return String.fromCharCode(charcode)
    }).join("").toUpperCase();
}
// 拼接url
export const contractUrl = (url, data) => {
  let queryString = '';

  Object.keys(data).forEach((key) => {
      const value = data[key];
      queryString += `&${key}=${value}`;
  });
  return `${url}?${queryString.substr(1)}`;
};
export function formatDate(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  }
