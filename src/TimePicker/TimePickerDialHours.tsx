import React from 'react';
import { TimePickerStore } from './TimePickerStore';
import { classesType } from './TimePickerStyle';
import { addLeadingZero, DialRadius, InnerRadius, OuterRadius, TickRadius } from './TimePickerUtile';

const DialsBuild = (props:{
    classes:Record<"TimePickerTick", string>
    timePickerStore:TimePickerStore
})=>{
    const [twelveHour] = props.timePickerStore.twelveHour()
    const [dial24HoursOneDigit] = props.timePickerStore.dial24HoursOneDigit()
    const [dial12HoursOneDigit] = props.timePickerStore.dial12HoursOneDigit()
    
    
    const elementsArray = []
    if (twelveHour) {
        let radius = OuterRadius
        for (let i = 1; i < 13; i += 1) {
            let radian = i / 6 * Math.PI;
            elementsArray.push(
                <div key={'TimePickerDialHours-'+i} id={'TimePickerDialHours-'+i} className={props.classes.TimePickerTick} style={{
                    left:DialRadius + Math.sin(radian) * radius - TickRadius + 'px',
                    top:DialRadius - Math.cos(radian) * radius - TickRadius + 'px'
                }}>
                    {dial12HoursOneDigit ? i : addLeadingZero(i)}
                </div>
            )
        }
    } else {
        for (let i = 0; i < 24; i += 1) {
            let radian = i / 6 * Math.PI;
            let inner = i > 0 && i < 13;
            let radius = inner ? InnerRadius : OuterRadius;

            elementsArray.push(
                <div key={'TimePickerDialHours-'+i} id={'TimePickerDialHours-'+i} className={[props.classes.TimePickerTick].join(' ')} style={{
                    left:DialRadius + Math.sin(radian) * radius - TickRadius + 'px',
                    top:DialRadius - Math.cos(radian) * radius - TickRadius + 'px'
                }}>
                    {
                    
                    i === 0 ? dial24HoursOneDigit ? '0':'00' : (dial24HoursOneDigit ? i :addLeadingZero(i))}
                </div>
            )
        }
    }
    return elementsArray
}
export const TimePickerDialHours:React.FC<{classes:classesType,timePickerStore:TimePickerStore}> = props =>(<>{DialsBuild(props)}</>)




