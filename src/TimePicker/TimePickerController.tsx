import React from "react";
import { TimePicker } from "./TimePicker";
import { useValue } from "react-nano-state";
import {TimePickerStore} from './TimePickerStore'


export type TimePickerControllerInitialStateOptinalType = {
    rtl?:boolean
    twelveHour?:boolean
    open?:boolean
    currentView?:'minutes'|'hours'
    amOrPm ?:'AM'|'PM'|'now'
    show24_toggel_btn?:boolean
    hours?:number
    minutes?:number
    //defaultTime:'now'|string // (hh|h):(mm|m) 
    
    dialMinutesOneDigit?:boolean,
    

    dial24HoursOneDigit?:boolean,
    dial12HoursOneDigit?:boolean,

    digitalDisplayMinutesOneDigit?:boolean,
    digitalDisplayHoursOneDigit?:boolean,
    
 

    handMoved?:boolean
    autoClose?:boolean
    autoSwitch?:boolean
}


export default class TimePickerController {
    



    public TimePicker: React.FC<{}>

    private timePickerStore!:TimePickerStore 
    private timePickerStoreID!:string 


    constructor(initialState?:TimePickerControllerInitialStateOptinalType){

        this.timePickerStore = TimePickerStore.newStore(initialState,this)
        this.timePickerStoreID = this.timePickerStore.id

        this.TimePicker = () =>{
            return (<TimePicker timePickerStoreID={this.timePickerStoreID}/>)
        }
    }




    open(){
        return this.timePickerStore.open()
    }

    rtl(){
        return this.timePickerStore.rtl()
    }

    twelveHour(){
        return this.timePickerStore.twelveHour()
    }

    autoClose(){
        return this.timePickerStore.autoClose()
    }

    autoSwitch(){
        return this.timePickerStore.autoSwitch()
    }

    currentView(){
        return useValue(this.timePickerStore._currentView)
    }

    amOrPm(){
        return this.timePickerStore.amOrPm()
    }

    hour(){
        return this.timePickerStore.hour()
    }

    minute(){
        return this.timePickerStore.minute()
    }

    handMoved(){
        return useValue(this.timePickerStore._handMoved)
    }

    dialMinutesOneDigit(){
        return this.timePickerStore.dialMinutesOneDigit()
    }

    dial24HoursOneDigit(){
        return this.timePickerStore.dial24HoursOneDigit()
    }
    dial12HoursOneDigit(){
        return this.timePickerStore.dial12HoursOneDigit()
    }
    digitalDisplayMinutesOneDigit(){
        return this.timePickerStore.digitalDisplayMinutesOneDigit()
    }
    digitalDisplayHoursOneDigit(){
        return this.timePickerStore.digitalDisplayHoursOneDigit()
    }

}
