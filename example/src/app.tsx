
import React, {useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

//@ts-ignore i will fix it soon
import TimePickerController from 'r-time-picker';



const timePickerController = new TimePickerController({
    twelveHour:true
})



// br not importent
const Br:React.FC<{count:number}> = (props) => {
    const list = []

    for(let i = 0;i<props.count;i++){
        list.push(<React.Fragment key={i+"br"}><br  /></React.Fragment>)
    }


    return (<>{list}</>)


}

console.log(timePickerController)
const App:React.FC<{}> = (props)=>{
    const  inputRef = useRef<HTMLInputElement|null>(null);
    const [open,setOpen] = timePickerController.open()


    const [hour,setHour] = timePickerController.hour()
    const [minute,setMinute] = timePickerController.minute()
    const [twelveHour,setTwelveHour] = timePickerController.twelveHour()
    const [amOrPm,setAmOrPm] = timePickerController.amOrPm()





    useEffect(()=>{
        if(inputRef.current)
            inputRef.current.setAttribute('value',`${hour}:${minute} ${twelveHour?amOrPm:''}`)
    },[hour,minute,twelveHour,amOrPm,inputRef])

    return (
        <React.Fragment>
            

                <timePickerController.TimePicker />



                <input ref={inputRef} type="text" onClick={(e)=>{
                    setOpen(true)
                }} onTouchEnd={(e)=>{
                    setOpen(true)
                }} ></input>
              <Br count={200} />
        </React.Fragment>

    )
}



ReactDOM.render(<App />, document.getElementById('root'));

