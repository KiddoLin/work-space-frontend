export function byteLen(str){
  var len = 0;
  for(var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) { //单字节加1
        len++;
      }
      else {
        len += 2;
      }
  }
  return len;
}

export function sliceByByteLen(str, max){
  var len = 0;
  for(var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) { //单字节加1
        len++;
      }
      else {
        len += 2;
      }
      if(len>max){
        return str.slice(0, i);
      }
  }
  return str;
}

export function byteLenCheck(rule, value, callback){
    let {maxByteLen, message} = rule;
    if(value && byteLen(value)>maxByteLen){
       callback(message);
    }
    else callback();
}
