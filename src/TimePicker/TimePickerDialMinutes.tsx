import React from 'react';
import { TimePickerStore } from './TimePickerStore';
import { classesType } from './TimePickerStyle';
import { addLeadingZero, DialRadius, OuterRadius, TickRadius } from './TimePickerUtile';


const DialsBuild = (props:{
    classes:classesType
    timePickerStore:TimePickerStore
})=>{

    const [dialMinutesOneDigit] = props.timePickerStore.dialMinutesOneDigit()
    const elementsArray = []
    for (let i = 0; i < 60; i += 5) {
        let radian = i / 30 * Math.PI;

        elementsArray.push(
            <div key={'TimePickerDialHours'+i} id={'TimePickerDialMinutes-'+i} className={props.classes.TimePickerTick} style={{
                left: DialRadius + Math.sin(radian) * OuterRadius - TickRadius + 'px',
                top: DialRadius - Math.cos(radian) * OuterRadius - TickRadius + 'px'

            }}>
                {dialMinutesOneDigit ? i: addLeadingZero(i)}
            </div>
        )

    }
    return elementsArray
}


export const TimePickerDialMinutes:React.FC<{classes:classesType,timePickerStore:TimePickerStore}> = props => (<>{DialsBuild(props)}</>)

