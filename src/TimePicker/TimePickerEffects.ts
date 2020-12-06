import { useEffect } from "react";
import { TimePickerStore } from "./TimePickerStore";
import { DialRadius, InnerRadius, OuterRadius } from "./TimePickerUtile";




export const TimePickerEffects = (timePickerStore:TimePickerStore,plateRef:React.MutableRefObject<HTMLDivElement | null>) =>{
    


    const [currentView] = timePickerStore.currentView()
    const [hour] = timePickerStore.hour()
    const [minute] = timePickerStore.minute()
    const [,setClockDialArgs] = timePickerStore.clockDialArgs()
    const [handMoved] = timePickerStore.handMoved()

    const [,setX0] =  timePickerStore.statX0()
    const [,setY0] =  timePickerStore.statY0()
    const [rtl] = timePickerStore.rtl()
    //change hour or minute on currentView updated
    useEffect(()=>{
        let currentViewId = currentView == 'hours' ? 'TimePickerDialHours' : 'TimePickerDialMinutes'
        let hideViewId = currentView == 'hours' ? 'TimePickerDialMinutes'  : 'TimePickerDialHours'
        let hideElement = document.getElementById(hideViewId)
        let currentElement = document.getElementById(currentViewId)

        if(hideElement != null){
            hideElement.classList.add('TimepickerDialOut');
            hideElement.style.opacity = '0'
        }
            

        if(currentElement != null){
            currentElement.style.visibility = 'visible'
            currentElement.style.opacity = 'unset'
            currentElement.classList.remove('TimepickerDialOut')
        }



        let toggleViewTimer = setTimeout(() => {
            if(hideElement != null){
                hideElement.style.visibility = 'hidden'
                
            }

            if(currentElement != null){
                
            }
            clearTimeout(toggleViewTimer);
        }, 350);
    },[currentView])



    useEffect(()=>{
        let clockPlateBR = plateRef.current!.getBoundingClientRect();
        let offset = { x: clockPlateBR.left, y: clockPlateBR.top };
        let x0 = offset.x + DialRadius
        let y0 = offset.y + DialRadius
        setY0(y0)
        setX0(x0)
    },[rtl])


    useEffect(()=>{
        let isHours = currentView === 'hours'
        let unit = Math.PI / (isHours ? 6 : 30)
        let value = isHours ? hour : minute
        let radian = value * unit
        let radius = isHours && value > 0 && value < 13 ? InnerRadius : OuterRadius
        let x = Math.sin(radian) * radius
        let y = -Math.cos(radian) * radius

        setClockDialArgs([x,y,false,undefined])

    },[currentView])

    useEffect(()=>{
        let isHours = currentView === 'hours'
        let unit = Math.PI / (isHours ? 6 : 30)
        let value = isHours ? hour : minute
        let radian = value * unit
        let radius = isHours && value > 0 && value < 13 ? InnerRadius : OuterRadius
        let x = Math.sin(radian) * radius
        let y = -Math.cos(radian) * radius

      

        if(!handMoved)
            setClockDialArgs([x,y,true,undefined])

    },[hour,minute])

    useEffect(()=>{

        let element = document.getElementById('TimePickerDialHours-'+hour)//!.style.color = 'white'
        if(element != null)
            element.style.color = 'white'

        return ()=>{
            if(element != null)
                element.style.color = 'unset'
        }
        
    },[hour])


    useEffect(()=>{
        let cache1 = minute % 5 == 0
        let cache2 = (minute - 1) % 5 == 0
        let cache3 = (minute + 1) % 5 == 0
        let element:HTMLElement |null = null

        if(cache1){
            element = document.getElementById('TimePickerDialMinutes-'+minute)
        } else if(cache2){
            element = document.getElementById('TimePickerDialMinutes-'+(minute - 1))
        } else if(cache3){
            element = document.getElementById('TimePickerDialMinutes-'+(minute + 1))
        }

        if(element != null)
            element.style.color = 'white'
        
        return ()=>{
            if(element != null)
                element.style.color = 'unset'
        }
        
    },[minute])

}



