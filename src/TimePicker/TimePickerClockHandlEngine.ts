import { useEffect } from "react";
import { TimePickerStore } from "./TimePickerStore";
import { InnerRadius, OuterRadius, TickRadius } from "./TimePickerUtile";

export const useClockHandlEngine = (timePickerStore:TimePickerStore)=>{
    const [clockDialArgs] = timePickerStore.clockDialArgs()
    const [currentView] = timePickerStore.currentView()
    const [twelveHour] = timePickerStore.twelveHour()
    const [,setHour] = timePickerStore.hour()
    const [,setMinute] = timePickerStore.minute()
    const [,setBgCx] = timePickerStore.bgCx()
    const [,setBgCy] = timePickerStore.bgCy()

    const [,setHandX2] = timePickerStore.handX2()
    const [,setHandY2] = timePickerStore.handY2()

    useEffect(()=>{
        const [x,y,updateValue,roundBy5] = clockDialArgs
        let radian = Math.atan2(x, -y),
        isHours = currentView === 'hours',
        unit = Math.PI / (isHours || roundBy5 ? 6 : 30),
        z = Math.sqrt(x * x + y * y),
        inner = isHours && z < (OuterRadius + InnerRadius) / 2,
        radius = inner ? InnerRadius : OuterRadius;

        if (twelveHour) 
            radius = OuterRadius;
        

        // Radian should in range [0, 2PI]
        if (radian < 0) 
            radian = Math.PI * 2 + radian;
        
        // Get the round value
        let value = Math.round(radian / unit);
        radian = value * unit;

        // Correct the hours or minutes
        if (twelveHour) {
            if (isHours) {
                if (value === 0) 
                    value = 12;
            } else {
                if (roundBy5) 
                    value *= 5;
                if (value === 60) 
                    value = 0;
            }
        } else {
            if (isHours) {
                if (value === 12) 
                    value = 0;
                value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            } else {
                if (roundBy5) 
                    value *= 5;
                
                if (value === 60) 
                    value = 0;
                
            }
        }

        if(updateValue){
            if(isHours)
                setHour(value)
            else 
                setMinute(value)
        }
        
        let cx1 = Math.sin(radian) * (radius - TickRadius),
            cy1 = -Math.cos(radian) * (radius - TickRadius),
            cx2 = Math.sin(radian) * radius,
            cy2 = -Math.cos(radian) * radius;

        setHandX2(cx1)
        setHandY2(cy1)
        setBgCx(cx2)
        setBgCy(cy2)
    },[clockDialArgs])
}

