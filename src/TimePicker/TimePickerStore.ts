import { useEffect, useRef } from "react";
import { createValueContainer, nanoStateContainer, useValue } from "react-nano-state";
import TimePickerController, {  TimePickerControllerInitialStateOptinalType } from "./TimePickerController";
import { convert24To12 } from "./TimePickerUtile";





export type TimePickerStoreInitialState = {
    rtl:boolean
    twelveHour:boolean
    open:boolean
    currentView:'minutes'|'hours'
    amOrPm :'AM'|'PM'|'now'
    show24_toggel_btn:boolean
    hours:number|undefined
    minutes:number|undefined

    dialMinutesOneDigit:boolean,
    dial24HoursOneDigit:boolean,
    dial12HoursOneDigit:boolean,
    digitalDisplayMinutesOneDigit:boolean,
    digitalDisplayHoursOneDigit:boolean,

   
    handMoved:boolean
    autoClose:boolean
    autoSwitch:boolean
}



export class TimePickerStore {
    private static defaultInitialState:TimePickerStoreInitialState = {
        rtl:false,
        twelveHour:true,
        open:false,
        currentView:'hours',
        amOrPm :'PM',
        show24_toggel_btn:false, // to do switch checkbox in next v
        hours:undefined,
        minutes:undefined,
        //defaultTime:'now',

        dialMinutesOneDigit:false,
        dial24HoursOneDigit:false,
        dial12HoursOneDigit:false,
        digitalDisplayMinutesOneDigit:false,
        digitalDisplayHoursOneDigit:false,


       
        handMoved:false,
        autoClose:true,
        autoSwitch:true


    }
    static nextID = 1

    static list:{[key:string]:TimePickerStore|undefined} = {}
    id: string;
    initialState:  TimePickerStoreInitialState;
    _rtl:nanoStateContainer<boolean>
    _open: nanoStateContainer<boolean>;
    _twelveHour: nanoStateContainer<boolean>;
    _autoClose: nanoStateContainer<boolean>;
    _autoSwitch: nanoStateContainer<boolean>;
    _currentView: nanoStateContainer<"hours" | "minutes">;
    timePickerController: TimePickerController;
    _amOrPm: nanoStateContainer<"AM" | "PM" | "now">;
    _minute: nanoStateContainer<number>;
    _hour: nanoStateContainer<number>;
    _handMoved: nanoStateContainer<boolean>;
    _statX0: nanoStateContainer<number>;
    _statY0: nanoStateContainer<number>;
    _statDx: nanoStateContainer<number>;
    _statDY: nanoStateContainer<number>;
    _bgCx: nanoStateContainer<number>;
    _bgCy: nanoStateContainer<number>;
    _handX2: nanoStateContainer<number>;
    _handY2: nanoStateContainer<number>;
    _clockDialArgs: nanoStateContainer<[number, number, boolean, boolean | undefined]>;
    _dialMinutesOneDigit: nanoStateContainer<boolean>;
    _dial24HoursOneDigit: nanoStateContainer<boolean>;
    _dial12HoursOneDigit: nanoStateContainer<boolean>;
    _digitalDisplayMinutesOneDigit: nanoStateContainer<boolean>;
    _digitalDisplayHoursOneDigit: nanoStateContainer<boolean>;



    constructor(initialState:TimePickerStoreInitialState,timePickerController:TimePickerController,id:string){

        this.timePickerController = timePickerController
        this.id = id;
        this.initialState = initialState//Object.assign(initialState,TimePickerStore.defaultInitialState)
        //initialState

        
        //const [dial24HoursOneDigit,setDial24HoursOneDigit] = props.timePickerStore.dial24HoursOneDigit()
   
        if((typeof  this.initialState.hours == 'undefined' || typeof  this.initialState.minutes == 'undefined' ||  this.initialState.amOrPm == 'now')){
            let date = new Date()
            let hours
            let minutes

           if(typeof  this.initialState.hours == 'undefined'){
                hours = date.getHours()
                if( this.initialState.twelveHour) {
                    let twelveHourNow = convert24To12(hours)
                     this.initialState.hours = twelveHourNow.hour
                     this.initialState.amOrPm = twelveHourNow.ampm
                } else {
                     this.initialState.hours = hours
                }
           }

            if(typeof  this.initialState.minutes == 'undefined'){
                minutes = date.getMinutes();
                 this.initialState.minutes = minutes
            }





        }



        
        this._rtl = createValueContainer<boolean>(this.initialState.rtl);
        this._open = createValueContainer<boolean>(this.initialState.open);
        this._twelveHour = createValueContainer<boolean>(this.initialState.twelveHour);
        this._autoClose = createValueContainer<boolean>(this.initialState.autoClose);
        this._autoSwitch = createValueContainer<boolean>(this.initialState.autoSwitch);
        this._currentView = createValueContainer<'minutes'|'hours'>(this.initialState.currentView);
        this._amOrPm = createValueContainer<'AM'|'PM'|'now'>( this.initialState.amOrPm)

        this._minute = createValueContainer<number>(this.initialState.minutes||12)
        this._hour = createValueContainer<number>(this.initialState.hours||12)
        
        
        this._dialMinutesOneDigit = createValueContainer<boolean>(this.initialState.dialMinutesOneDigit)



        this._dial24HoursOneDigit = createValueContainer<boolean>(this.initialState.dial24HoursOneDigit)
        this._dial12HoursOneDigit = createValueContainer<boolean>(this.initialState.dial12HoursOneDigit)
        this._digitalDisplayMinutesOneDigit = createValueContainer<boolean>(this.initialState.digitalDisplayMinutesOneDigit)
        this._digitalDisplayHoursOneDigit = createValueContainer<boolean>(this.initialState.digitalDisplayHoursOneDigit)


        this._handMoved = createValueContainer<boolean>(false)





        this._statX0 = createValueContainer<number>(0)
        this._statY0 = createValueContainer<number>(0)
        this._statDx = createValueContainer<number>(0)
        this._statDY = createValueContainer<number>(0)

        this._bgCx = createValueContainer<number>(0)
        this._bgCy = createValueContainer<number>(0)
        this._handX2 = createValueContainer<number>(0)
        this._handY2 = createValueContainer<number>(0)

        this._clockDialArgs = createValueContainer<[number,number,boolean,(boolean|undefined)]>([0,0,false,false])


    }

    static newStore(initialState:TimePickerControllerInitialStateOptinalType|undefined,timePickerController:TimePickerController){
        let id = (TimePickerStore.nextID++).toString(16)
        let obj = new TimePickerStore(({...TimePickerStore.defaultInitialState,...initialState||{}}),timePickerController,id)
        TimePickerStore.list[id] = obj
  
        return obj
    }   

    open(){
        return useValue(this._open)
    }
    rtl(){
        return useValue(this._rtl)
    }

    
    twelveHour(){
        return useValue(this._twelveHour)
    }
    autoClose(){
        return useValue(this._autoClose)
    }

    autoSwitch(){
        return useValue(this._autoSwitch)
    }
    
    
    currentView():["minutes" | "hours",(arg:"minutes" | "hours")=>void,React.MutableRefObject<"minutes" | "hours">]{

        let _useValue = useValue(this._currentView)
        let [currentView,setCurrentView] = _useValue

        const ref = useRef<"minutes" | "hours">(currentView);

        useEffect(()=>{
            ref.current = currentView
        },[currentView])



        return [currentView,setCurrentView,ref]

      
    }

    amOrPm(){
        return useValue(this._amOrPm)
    }

    hour(){
        return useValue(this._hour)
    }

    minute(){
        return useValue(this._minute)
    }

    dialMinutesOneDigit(){
        return useValue(this._dialMinutesOneDigit)
    }

    dial24HoursOneDigit(){
        return useValue(this._dial24HoursOneDigit)
    }
    dial12HoursOneDigit(){
        return useValue(this._dial12HoursOneDigit)
    }
    digitalDisplayMinutesOneDigit(){
        return useValue(this._digitalDisplayMinutesOneDigit)
    }
    digitalDisplayHoursOneDigit(){
        return useValue(this._digitalDisplayHoursOneDigit)
    }


    handMoved():[boolean,(arg:boolean)=>void,React.MutableRefObject<boolean>]{

        let _useValue = useValue(this._handMoved)
        let [handMoved,setHandMoved] = _useValue

        const ref = useRef<boolean>(handMoved);

        useEffect(()=>{
            ref.current = handMoved
            console.log(`set ${handMoved}`)
        },[handMoved])



        return [handMoved,setHandMoved,ref]



        
    }

    statX0():[number,(arg:number)=>void,React.MutableRefObject<number>] {

        let _useValue = useValue(this._statX0)
        let [statX0,setStatX0] = _useValue

        const ref = useRef<number>(statX0);

        useEffect(()=>{
            ref.current = statX0
        },[statX0])
       




        return [statX0,setStatX0,ref]

        
    }
    statY0():[number,(arg:number)=>void,React.MutableRefObject<number>] {
        let _useValue = useValue(this._statY0)
        let [statY0,setStatY0] = _useValue
        let ref = useRef<number>(statY0);
        useEffect(()=>{
            ref.current = statY0
        },[statY0])
        


        return [statY0,setStatY0,ref]
        
    }
    statDx():[number,(arg:number)=>void,React.MutableRefObject<number>]{
        let _useValue = useValue(this._statDx)
        let [statDx,setStatDx] = _useValue
        let ref = useRef<number>(statDx);

        useEffect(()=>{
            ref.current = statDx
        },[statDx])

        return [statDx,setStatDx,ref]
    }
    statDY():[number,(arg:number)=>void,React.MutableRefObject<number>]{
        let _useValue = useValue(this._statDY)
        let [statDY,setStatDY] = _useValue
        let ref = useRef<number>(statDY);

        useEffect(()=>{
            ref.current = statDY
        },[statDY])
        
        return [statDY,setStatDY,ref]
    }



    bgCx(){
        return useValue(this._bgCx)
    }
    bgCy(){
        return useValue(this._bgCy)
    }
    handX2(){
        return useValue(this._handX2)
    }
    handY2(){
        return useValue(this._handY2)
    }
    
    clockDialArgs(){
        return useValue(this._clockDialArgs)
    }
    


}