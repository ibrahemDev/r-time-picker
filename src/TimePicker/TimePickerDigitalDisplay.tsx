import React from "react"
import { TimePickerStore } from "./TimePickerStore";
import { classesType } from "./TimePickerStyle";
import { addLeadingZero } from "./TimePickerUtile";

export const TimePickerDigitalDisplay:React.FC<{
    classes:classesType
    timePickerStore:TimePickerStore
}> = (props) =>{

    const [twelveHour] = props.timePickerStore.twelveHour()
    const [currentView,setCurrentView] = props.timePickerStore.currentView()
    const [hour] = props.timePickerStore.hour()
    const [minute] = props.timePickerStore.minute()
    const [amOrPm,setAmOrPm] = props.timePickerStore.amOrPm()
    const [digitalDisplayMinutesOneDigit] = props.timePickerStore.digitalDisplayMinutesOneDigit()
    const [digitalDisplayHoursOneDigit] = props.timePickerStore.digitalDisplayHoursOneDigit()
    
    
    return (
        <div className={props.classes.TimePickerDigitalDisplay}>
            <div className={props.classes.TimePickerTextContainer}>
                <div >
                    <span className={props.classes.TimePickerSpanHours} onClick={()=>setCurrentView('hours')} style={{
                        color:currentView == 'hours'?'white':'unset',
                        display: 'inline-block',
                        width: '70px'
                    }}>{digitalDisplayHoursOneDigit ? hour : addLeadingZero(hour)}</span>
                    :
                    <span className={props.classes.TimePickerSpanMinutes} onClick={()=>setCurrentView('minutes')} style={{
                        color:currentView == 'minutes'?'white':'unset',
                        display: 'inline-block',
                        width: '70px'
                    }}>{digitalDisplayMinutesOneDigit ? minute : addLeadingZero(minute)}</span>
                </div>
                <div className={props.classes.TimePickerDisplayAmPm24}>{
                        twelveHour ? (
                            <>
                                <div style={{
                                    flex:1,
                                    color: "white",
                                    opacity:(amOrPm == 'AM') ? 1 : 0.5
                                }} onClick={()=>{
                                    if(amOrPm != 'AM')
                                        setAmOrPm('AM')
                                }}>AM</div>
                                <div style={{
                                    flex:1,
                                    color: "white",
                                    opacity:(amOrPm == 'PM')?1 : 0.5
                                }} onClick={()=>{
                                    if(amOrPm != 'PM')
                                        setAmOrPm('PM')
                                }}>PM</div>
                            </>
                        ) : <></>
                }</div>
            </div>
        </div>
    )
}

