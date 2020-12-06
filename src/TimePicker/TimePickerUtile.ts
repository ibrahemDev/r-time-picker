
export const DialRadius = 135;
export const OuterRadius = 105;
export const InnerRadius = 70;
export const TickRadius = 20;

export const Diameter  = DialRadius * 2


// get client x and y from both MouseEvent,TouchEvent 
export const Pos = (e:MouseEvent&TouchEvent)=>{
  //MouseEvent|TouchEvent

    if (e.targetTouches && e.targetTouches.length >= 1) {
        return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
    }
    // mouse event
    return { x: e.clientX, y: e.clientY };


}


export const addLeadingZero = (num:number) => {
  return (num < 10 ? '0' : '') + num;
}

// soon Feature ^_^
export const NumberLangsConverters = (to:string[],numberStr:string)=>{
  const from = ['0','1','2','3','4','5','6','7','8','9']
  var to = to
  var split = numberStr.split('')
  for(var i = 0;i<split.length;i++){
    var indexof = from.indexOf(split[i])
    if(indexof != -1){
      split[i] = to[indexof]
    }

    
  }
  return split.join('')



  /*= [
    '٠',
    '١',
    '٢',
    '٣',
    '٤',
    '٥',
    '٦',
    '٧',
    '٨',
    '٩'
  ]*/
}



//convert 24 houer to 12 
export const convert24To12 = (H:number)=>{
  if(H <= 0 || H > 24)
    H = 24
  let h = H % 12 || 12;
  var ampm:"AM"|"PM" = (H < 12 || H === 24) ? "AM" : "PM";
  return {
    hour:h,
    ampm
  }
}


