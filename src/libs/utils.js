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
