
import React from 'react'
import { TimePickerDialHours } from './TimePickerDialHours';
import { TimePickerDialMinutes } from './TimePickerDialMinutes';
import { classesType } from './TimePickerStyle';
import { DialRadius, Diameter, TickRadius} from './TimePickerUtile';
import { TimePickerStore } from './TimePickerStore';


export const TimePickerAnalogDisplay:React.FC<{  
    divPlateRef:React.MutableRefObject<HTMLDivElement | null>,
    classes:classesType
    timePickerStore:TimePickerStore
    
}> = (props) =>{
   
   

    const [bgCx] = props.timePickerStore.bgCx()
    const [bgCy] = props.timePickerStore.bgCy()
    const [handX2] = props.timePickerStore.handX2()
    const [handY2] = props.timePickerStore.handY2()
    return (
        <div className={props.classes.TimePickerAnalogDisplay}>
            <div  className={props.classes.TimePickerPlate} ref={props.divPlateRef}>
                <div className={props.classes.TimePickerSvgDiv}>
                    <svg className="timepicker-svg" width={Diameter} height={Diameter}>
                        <g transform={`translate(${DialRadius},${DialRadius})`}>
                            <line x1="0" y1="0" x2={handX2 == 0? undefined : handX2} y2={handY2 == 0 ?undefined : handY2}></line>
                            <circle className={props.classes.TimePickerSvgCircle} cx={bgCx == 0 ? undefined : bgCx} cy={bgCy == 0?undefined : bgCy} r={TickRadius}></circle>
                            <circle className={props.classes.TimePickerSvgCircle} cx="0" cy="0" r="4"></circle>
                        </g>
                    </svg>
                </div>
                <div className={[props.classes.TimePickerDial,props.classes.TimePickerDialHours].join(' ')} id="TimePickerDialHours" >
                    <TimePickerDialHours classes={props.classes} timePickerStore={props.timePickerStore}  />
                </div>
                <div className={[props.classes.TimePickerDial,props.classes.TimePickerDialMinutes].join(' ')} id="TimePickerDialMinutes" >
                    <TimePickerDialMinutes classes={props.classes} timePickerStore={props.timePickerStore} />
                </div>
            </div>
            <div className="timepicker-footer">
                
                <div className="confirmation-btns" style={{height: '22px'}}>
                    
                </div>
            </div>
        </div>
    )
}
