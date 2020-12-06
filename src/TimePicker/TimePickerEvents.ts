import { useEffect } from "react";
import { TimePickerStore } from "./TimePickerStore";
import { DialRadius, Pos } from "./TimePickerUtile";






export const useTimePickerEvents = (timePickerStore:TimePickerStore,plateRef:React.MutableRefObject<HTMLDivElement | null>)=>{

    

    const [, setHandMoved, handMovedRef] = timePickerStore.handMoved()


    const [,setX0, statX0Ref] =  timePickerStore.statX0()
    const [,setY0, statY0Ref] =  timePickerStore.statY0()
    const [,setDX, statDxRef] =  timePickerStore.statDx()
    const [,setDY, statDYRef] =  timePickerStore.statDY()
    const [,setCurrentView,currentViewRef] = timePickerStore.currentView()
    const [autoClose] = timePickerStore.autoClose()
    const [autoSwitch] = timePickerStore.autoSwitch()
    const [,setClockDialArgs] = timePickerStore.clockDialArgs()
    const [,setOpen] = timePickerStore.open()

    
    useEffect(() => {
        const setMouseMoveEvent = (e:MouseEvent&TouchEvent) => {
            e.preventDefault();
            setHandMoved(true)
            let clickPos = Pos(e);

            let dx = clickPos.x - statX0Ref.current
            let dy = clickPos.y - statY0Ref.current
            setDX(dx)
            setDY(dy)

            let x = clickPos.x - statX0Ref.current;
            let y = clickPos.y - statY0Ref.current;


            setClockDialArgs([x,y,true,false])
        };
        const setMouseUpEvent = (e:MouseEvent&TouchEvent) => {
            e.preventDefault();
            document.removeEventListener("mousemove", setMouseMoveEvent as (e:MouseEvent)=>void);
            document.removeEventListener("touchmove", setMouseMoveEvent as (e:TouchEvent)=>void);

            let pos = Pos(e)
            let x = pos.x - statX0Ref.current;
            let y = pos.y - statY0Ref.current;
            
            if (handMovedRef.current && x === statDxRef.current && y === statDYRef.current )
                setClockDialArgs([x,y,true,undefined])
            if (currentViewRef.current === 'hours' && autoSwitch) 
                setCurrentView('minutes')
            else if (autoClose && currentViewRef.current == 'minutes') 
                setOpen(false)

            document.removeEventListener('mouseup', setMouseUpEvent as (e:MouseEvent)=>void);
            document.removeEventListener('touchend', setMouseUpEvent as (e:TouchEvent)=>void);
        };
        const setMousePlateDown = (e:MouseEvent&TouchEvent) => {
            e.preventDefault();
            let pos = Pos(e)
            let clockPlateBR = plateRef.current!.getBoundingClientRect();
            let offset = { x: clockPlateBR.left, y: clockPlateBR.top };
            let x0 = offset.x + DialRadius
            let y0 = offset.y + DialRadius
            setY0(y0)
            setX0(x0)
            setHandMoved(false)
            let dx = pos.x - x0
            let dy = pos.y - y0
            setDX(dx)
            setDY(dy)
            // Set clock hands
            setClockDialArgs([dx,dy,true,false])
            document.addEventListener("mousemove", setMouseMoveEvent as (e:MouseEvent)=>void);
            document.addEventListener("touchmove", setMouseMoveEvent as (e:TouchEvent)=>void);
            document.addEventListener('mouseup', setMouseUpEvent as (e:MouseEvent)=>void);
            document.addEventListener('touchend', setMouseUpEvent as (e:TouchEvent)=>void);
        };
        if(plateRef.current != null){

            
            plateRef.current.addEventListener('mousedown',setMousePlateDown as (e:MouseEvent)=>void,false)
            plateRef.current.addEventListener('touchstart',setMousePlateDown as (e:TouchEvent)=>void,false)
        } 

        return () =>{
           

            
            if(plateRef.current != null){

                plateRef.current.removeEventListener('mousedown',setMousePlateDown as (e:MouseEvent)=>void)
        
                plateRef.current.removeEventListener('touchstart',setMousePlateDown as (e:TouchEvent)=>void)
                
                document.removeEventListener('mouseup', setMouseUpEvent as (e:MouseEvent)=>void);
        
                document.removeEventListener('touchend', setMouseUpEvent as (e:TouchEvent)=>void);
            
                document.removeEventListener("mousemove", setMouseMoveEvent as (e:MouseEvent)=>void);
            
                document.removeEventListener("touchmove", setMouseMoveEvent as (e:TouchEvent)=>void);
                
            }
     
        }
    },[plateRef])

}