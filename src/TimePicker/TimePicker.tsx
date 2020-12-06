import React, { useRef } from 'react';
import { useMediaQuery } from 'react-responsive'
import { TimePickerAnalogDisplay } from './TimePickerAnalogDisplay';
import { TimePickerDigitalDisplay } from './TimePickerDigitalDisplay';
import { TimePickerEffects } from './TimePickerEffects';
import { useTimePickerStyle } from './TimePickerStyle';
import { useTimePickerEvents } from './TimePickerEvents';
import { TimePickerStore } from './TimePickerStore';
import { useClockHandlEngine } from './TimePickerClockHandlEngine';

export const TimePicker:React.FC<{  
    timePickerStoreID:string 
}> = (props)=>{
    const timePickerStore = TimePickerStore.list[props.timePickerStoreID]
    if(typeof timePickerStore == 'undefined'){
        return null
    }
    const  divPlateRef = useRef<HTMLDivElement|null>(null);
    useTimePickerEvents(timePickerStore,divPlateRef)
    TimePickerEffects(timePickerStore,divPlateRef)
    useClockHandlEngine(timePickerStore)

    const classes =  useTimePickerStyle();
    const [open,setOpen] = timePickerStore.open()
    const [rtl] = timePickerStore.rtl()

    const maxWidth1100AndMinWidth600 = useMediaQuery({
        query: '(max-width: 1100px) and (min-width: 600px)'
    })
    const onlyScreenAndMinWidth992 = useMediaQuery({
        query: 'only screen and (min-width: 992px)'
    })

    const onlyScreenAndMaxWidth992 = useMediaQuery({
        query: 'only screen and (max-width: 992px)'
    })
    return (
        <div style={{
            position: 'relative',
            marginTop: '1rem',
            marginBottom: '1rem'
        }}>
            <div className={classes.TimePicker} style={{
                zIndex: 1003,
                display: open?'block':"none",
                
                top: onlyScreenAndMaxWidth992 ?"2%":"10%",
                transform: 'scaleX(1) scaleY(1)'
                
            }}>
                <div className={classes.TimePickerContent} style={maxWidth1100AndMinWidth600 || onlyScreenAndMinWidth992?{
                    WebkitFlexDirection: rtl ? 'row-reverse' : 'row',
                    msFlexDirection:  rtl ? 'row-reverse' : 'row',
                    flexDirection: rtl ? 'row-reverse' : 'row'
                }:undefined}>
                    <TimePickerDigitalDisplay    {...props} classes={classes} timePickerStore={timePickerStore }/>
                    <TimePickerAnalogDisplay    {...props} classes={classes} divPlateRef={divPlateRef} timePickerStore={timePickerStore }/>
                </div>
            </div>
            <div className={classes.TimePickerOverlay} style={{
                zIndex: 1002,
                display: open?'block':"none",
               
            }} onClick={()=>{
                setOpen(false)
            }}></div>
        </div>
    )
}